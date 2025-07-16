import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5'
import { useUserStore } from '../../store/userStore'
import { useQuestionStore } from '../../store/questionStore'
import { getTimeAgo } from '../../utils/timeUtils'
import Editor from '../../components/Editor'

export default function QuestionAnswers() {
    const { question_id } = useParams()

    const { isAuthenticated, user } = useUserStore();
    const { questions, setQuestions } = useQuestionStore();

    const [details, setDetails] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const [userAnswer, setUserAnswer] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const editorRef = useRef(null);
    const selectionRef = useRef(null);
    const pendingImagesRef = useRef([]);

    const handleVote = async (answerId, type) => {
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

    const handleSubmit = async () => {
        const extractPlainText = (html) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            return tempDiv.textContent.replace(/\u00a0/g, '').trim();
        };

        if (!userAnswer || !extractPlainText(userAnswer)) {
            return toast.error('Answer cannot be empty');
        }

        setSubmitting(true);

        try {
            let html = userAnswer;

            for (const { file, blobUrl } of pendingImagesRef.current) {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/qa/upload-image`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(response.status === 401 ? 'Login to post answer' : 'Image upload failed');
                }

                const data = await response.json();
                const serverUrl = data.url;
                html = html.replaceAll(blobUrl, serverUrl);
            }

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/qa/save-answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    question_id,
                    content: html
                })
            });

            const response = await res.json();

            if (!res.ok) {
                throw new Error(response.message || 'Failed to save answer');
            }

            toast.success('Answer posted successfully!');

            setDetails(prev => ({
                ...prev,
                answers: [...prev.answers, response.answer]
            }));

            const updatedQuestions = questions.map(q =>
                q._id === question_id ? { ...q, answerCount: (q.answerCount || 0) + 1 } : q
            );
            setQuestions(updatedQuestions)

            if (editorRef.current) editorRef.current.innerHTML = '';
            setUserAnswer('');
            pendingImagesRef.current = [];
            selectionRef.current = null;
        }
        catch (err) {
            toast.error(err.message || 'An error occurred while posting the answer');
        }
        finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/qa/${question_id}`)
                const response = await res.json();

                if (response?.question?._id) setDetails(response);
            }
            catch (err) {
                toast.error(err.message)
            }
            finally {
                setLoading(false)
            }
        }

        fetchQuestion()
    }, [question_id])

    if (isLoading) return <div className='max-w-6xl w-full mx-auto py-6 sm:py-8 px-2'>Loading...</div>
    else if (!details?.question?._id) return <div className='max-w-6xl w-full mx-auto py-6 sm:py-8 px-2 text-red-600'>Question not found</div>
    return (
        <div className='max-w-6xl w-full mx-auto py-6 sm:py-8 px-2'>
            <h1 className='text-[22px] md:text-[27px] text-gray-800'>{details.question.title}</h1>
            <div className='pt-3 md:pt-2 pb-5 flex flex-wrap gap-3 text-[11px] md:text-xs border-b border-gray-300'>
                <p className='text-gray-500'>Asked <span className='text-black'>{getTimeAgo(details.question.createdAt)}</span></p>
                {details.question.updatedAt !== details.question.createdAt && (
                    <p className='text-gray-500'>
                        Modified <span className='text-black'>{getTimeAgo(details.question.updatedAt)}</span>
                    </p>
                )}
                <p className='text-gray-500'>Viewed <span className='text-black'>{details.question.views} {details.question.views > 1 ? 'times' : 'time'}</span></p>
            </div>

            <div className='mt-5 px-2 flex gap-4'>
                <div className='flex flex-col gap-2 items-center'>
                    <button
                        className='size-[40px] grid place-items-center border border-gray-300 hover:bg-[hsl(27,89%,87%)] rounded-full cursor-pointer'
                    >
                        <IoCaretUpSharp size={18} className='text-gray-700' />
                    </button>
                    <p className='text-lg'>0</p>
                    <button
                        className='size-[40px] grid place-items-center border border-gray-300 hover:bg-[hsl(27,89%,87%)] rounded-full cursor-pointer'
                    >
                        <IoCaretDownSharp size={18} className='text-gray-700' />
                    </button>
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <div>
                        <div id='description' dangerouslySetInnerHTML={{ __html: details.question.description }} />
                        <div className='mt-6 flex flex-wrap gap-1'>
                            {details.question.tags.map((tag, index) => (
                                <button
                                    key={index}
                                    className='h-fit py-0.5 px-2 rounded bg-gray-200 text-gray-600 text-xs font-semibold cursor-pointer'
                                >
                                    {tag.toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex-grow w-full flex items-end'>
                        <div className='w-fit ml-auto p-1.5 flex flex-col justify-end gap-2 bg-[#edf5fd] rounded'>
                            <p className='text-xs text-gray-600 whitespace-nowrap'>asked {getTimeAgo(details.question.createdAt)}</p>
                            <div className='flex items-center gap-1'>
                                <img
                                    src={details.question.user.avatar || '/user.png'}
                                    className='size-8 rounded outline outline-[hsl(210,8%,90%)]'
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <p className='text-[13px] whitespace-nowrap'>{details.question.user.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {details.answers.length > 0 && (
                <>
                    <h1 className='mt-10 text-lg text-gray-800'>{details.answers.length} Answer</h1>

                    {[...details.answers]
                        .sort((a, b) => {
                            const votesA = a.upvotes.length - a.downvotes.length;
                            const votesB = b.upvotes.length - b.downvotes.length;

                            if (votesA !== votesB) {
                                return votesB - votesA;
                            }

                            return new Date(a.createdAt) - new Date(b.createdAt);
                        })
                        .map(answer => (
                            <div key={answer._id} className='pt-5 pb-6 px-2 flex gap-4 border-b-1 border-[hsl(210,8%,90%)]'>
                                <div className='flex flex-col gap-2 items-center'>
                                    <button
                                        onClick={() => handleVote(answer._id, 'upvote')}
                                        className={`size-[40px] grid place-items-center border border-gray-300 rounded-full cursor-pointer ${(isAuthenticated && answer.upvotes.includes(user._id)) ? 'bg-[hsl(27,89%,87%)]' : 'hover:bg-[hsl(27,89%,87%)]'}`}
                                    >
                                        <IoCaretUpSharp size={18} className='text-gray-700' />
                                    </button>
                                    <p className='text-lg'>{answer.upvotes.length - answer.downvotes.length}</p>
                                    <button
                                        onClick={() => handleVote(answer._id, 'downvote')}
                                        className={`size-[40px] grid place-items-center border border-gray-300 rounded-full cursor-pointer ${(isAuthenticated && answer.downvotes.includes(user._id)) ? 'bg-[hsl(27,89%,87%)]' : 'hover:bg-[hsl(27,89%,87%)]'}`}
                                    >
                                        <IoCaretDownSharp size={18} className='text-gray-700' />
                                    </button>
                                </div>

                                <div className='w-full flex flex-col gap-4'>
                                    <div id='description' dangerouslySetInnerHTML={{ __html: answer.content }} />
                                    <div className='flex-grow w-full flex items-end'>
                                        <div className='w-fit ml-auto flex flex-col justify-end gap-2'>
                                            <p className='text-xs text-gray-600 whitespace-nowrap'>
                                                answered {getTimeAgo(answer.createdAt)}
                                            </p>
                                            <div className='flex items-center gap-1'>
                                                <img
                                                    src={answer.user.avatar || '/user.png'}
                                                    className='size-8 rounded outline outline-[hsl(210,8%,90%)]'
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                                <p className='text-[13px] whitespace-nowrap'>{answer.user.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
            )}

            <h1 className='mt-5 mb-2 text-lg text-gray-600'>Submit Your Answer</h1>

            <Editor
                editorRef={editorRef}
                content={userAnswer}
                setContent={setUserAnswer}
                selectionRef={selectionRef}
                pendingImagesRef={pendingImagesRef}
            />

            <div className='mt-6 w-full flex justify-center'>
                <button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 cursor-pointer'} px-4 py-2 text-white rounded`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    )
}