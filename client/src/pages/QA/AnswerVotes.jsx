import { toast } from 'sonner'
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5'
import { useUserStore } from '../../store/userStore'

const AnswerVotes = ({ details, setDetails, answer }) => {
    const { isAuthenticated, user } = useUserStore();

    const handleVoteAnswer = async (answerId, type) => {
        if (!isAuthenticated) {
            return toast.error(`Login to ${type === 'upvote' ? 'upvote' : 'downvote'}`);
        }

        const targetAnswer = details.answers.find(answer => answer._id === answerId);
        if (!targetAnswer) {
            return toast.error('Answer not found');
        }
        else if (targetAnswer.user._id === user._id) {
            return toast.error('You cannot vote on your own answer');
        }

        let previousAnswers;

        setDetails(prev => {
            const updatedAnswers = prev.answers.map(answer => {
                if (answer._id !== answerId) return answer;

                const hasUpvoted = answer.upvotes.includes(user._id);
                const hasDownvoted = answer.downvotes.includes(user._id);

                let newUpvotes = [...answer.upvotes];
                let newDownvotes = [...answer.downvotes];

                if (type === 'upvote') {
                    if (hasUpvoted) {
                        newUpvotes = newUpvotes.filter(id => id !== user._id);
                    }
                    else {
                        if (hasDownvoted) {
                            newDownvotes = newDownvotes.filter(id => id !== user._id);
                        }
                        newUpvotes.push(user._id);
                    }
                }
                else if (type === 'downvote') {
                    if (hasDownvoted) {
                        newDownvotes = newDownvotes.filter(id => id !== user._id);
                    }
                    else {
                        if (hasUpvoted) {
                            newUpvotes = newUpvotes.filter(id => id !== user._id);
                        }
                        newDownvotes.push(user._id);
                    }
                }

                return {
                    ...answer,
                    upvotes: newUpvotes,
                    downvotes: newDownvotes
                };
            });

            previousAnswers = prev.answers;
            return { ...prev, answers: updatedAnswers };
        });

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/qa/vote-answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ answerId, type })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Vote failed');
            }

            setDetails(prev => {
                const updatedAnswers = prev.answers.map(answer => {
                    if (answer._id !== answerId) return answer;
                    return {
                        ...answer,
                        upvotes: data.upvotes,
                        downvotes: data.downvotes
                    };
                });
                return { ...prev, answers: updatedAnswers };
            });
        }
        catch (err) {
            toast.error(err.message || 'Vote failed');
            setDetails(prev => ({ ...prev, answers: previousAnswers }));
        }
    };

    return (
        <div className='flex flex-col gap-2 items-center'>
            <button
                onClick={() => handleVoteAnswer(answer._id, 'upvote')}
                className={`size-[40px] grid place-items-center border border-gray-300 rounded-full cursor-pointer duration-200 ${(isAuthenticated && answer.upvotes.includes(user._id)) ? 'bg-[hsl(27,89%,87%)]' : 'active:scale-80'}`}
            >
                <IoCaretUpSharp size={18} className='text-gray-700' />
            </button>

            <p className='text-lg'>
                {answer.upvotes.length - answer.downvotes.length}
            </p>

            <button
                onClick={() => handleVoteAnswer(answer._id, 'downvote')}
                className={`size-[40px] grid place-items-center border border-gray-300 rounded-full cursor-pointer duration-200 ${(isAuthenticated && answer.downvotes.includes(user._id)) ? 'bg-[hsl(27,89%,87%)]' : 'active:scale-80'}`}
            >
                <IoCaretDownSharp size={18} className='text-gray-700' />
            </button>
        </div>
    )
}

export default AnswerVotes