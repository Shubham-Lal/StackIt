import { toast } from 'sonner'
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5'
import { useUserStore } from '../../store/userStore'

const QuestionVotes = ({ details, setDetails }) => {
    const { isAuthenticated, user } = useUserStore();

    const handleVoteQuestion = async (type) => {
        if (!isAuthenticated) {
            return toast.error(`Login to ${type === 'upvote' ? 'upvote' : 'downvote'}`);
        }

        const question = details.question;

        if (!question) {
            return toast.error('Question not found');
        }
        else if (question.user._id === user._id) {
            return toast.error('You cannot vote on your own question');
        }

        let previousQuestion;

        setDetails(prev => {
            const hasUpvoted = question.upvotes.includes(user._id);
            const hasDownvoted = question.downvotes.includes(user._id);

            let newUpvotes = [...question.upvotes];
            let newDownvotes = [...question.downvotes];

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

            previousQuestion = prev.question;

            return {
                ...prev,
                question: {
                    ...prev.question,
                    upvotes: newUpvotes,
                    downvotes: newDownvotes
                }
            };
        });

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/qa/vote-question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ questionId: question._id, type })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Vote failed');
            }

            setDetails(prev => ({
                ...prev,
                question: {
                    ...prev.question,
                    upvotes: data.upvotes,
                    downvotes: data.downvotes
                }
            }));
        }
        catch (err) {
            toast.error(err.message || 'Vote failed');
            setDetails(prev => ({ ...prev, question: previousQuestion }));
        }
    };

    return (
        <div className='flex flex-col gap-2 items-center'>
            <button
                onClick={() => handleVoteQuestion('upvote')}
                className={`size-[40px] grid place-items-center border border-gray-300 rounded-full cursor-pointer duration-200 ${(isAuthenticated && details.question.upvotes.includes(user._id)) ? 'bg-[hsl(27,89%,87%)]' : 'active:scale-80'}`}
            >
                <IoCaretUpSharp size={18} className='text-gray-700' />
            </button>

            <p className='text-lg'>
                {details.question.upvotes.length - details.question.downvotes.length}
            </p>

            <button
                onClick={() => handleVoteQuestion('downvote')}
                className={`size-[40px] grid place-items-center border border-gray-300 rounded-full cursor-pointer duration-200 ${(isAuthenticated && details.question.downvotes.includes(user._id)) ? 'bg-[hsl(27,89%,87%)]' : 'active:scale-80'}`}
            >
                <IoCaretDownSharp size={18} className='text-gray-700' />
            </button>
        </div>
    )
}

export default QuestionVotes