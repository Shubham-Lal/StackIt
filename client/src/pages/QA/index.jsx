import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { getTimeAgo } from '../../utils/timeUtils'
import QuestionVotes from './QuestionVotes'
import AnswerVotes from './AnswerVotes'
import SubmitAnswer from './SubmitAnswer'

export default function QuestionAnswers() {
    const { question_id } = useParams()

    const [details, setDetails] = useState(null)
    const [isLoading, setLoading] = useState(true)

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
                <QuestionVotes
                    details={details}
                    setDetails={setDetails}
                />

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
                                <AnswerVotes
                                    details={details}
                                    setDetails={setDetails}
                                    answer={answer}
                                />

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

            <SubmitAnswer
                question_id={question_id}
                setDetails={setDetails}
            />
        </div>
    )
}