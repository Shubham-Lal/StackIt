import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5'
import { getTimeAgo } from '../utils/timeUtils'

export default function QuestionDetails() {
    const { question_id } = useParams()
    const [question, setQuestion] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/questions/${question_id}`)
                const response = await res.json();

                if (response._id) setQuestion(response);
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

    if (isLoading) return <div className='max-w-6xl w-full mx-auto py-8 px-2'>Loading...</div>
    else if (!question?._id) return <div className='max-w-6xl w-full mx-auto py-8 px-2 text-red-600'>Question not found</div>
    return (
        <div className='max-w-6xl w-full mx-auto py-8 px-2'>
            <h1 className='text-xl md:text-2xl text-gray-800'>{question.title}</h1>
            <div className='pt-3 pb-5 flex flex-wrap gap-3 text-[11px] md:text-xs border-b border-gray-300'>
                <p className='text-gray-500'>Asked <span className='text-black'>{getTimeAgo(question.createdAt)}</span></p>
                {question.updatedAt !== question.createdAt && (
                    <p className='text-gray-500'>
                        Modified <span className='text-black'>{getTimeAgo(question.updatedAt)}</span>
                    </p>
                )}
                <p className='text-gray-500'>Viewed <span className='text-black'>{question.views} {question.views > 1 ? 'times' : 'time'}</span></p>
            </div>

            <div className='mt-5 flex gap-4'>
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

                <div>
                    <div id='description' dangerouslySetInnerHTML={{ __html: question.description }} />
                    <div className='mt-6 flex flex-wrap gap-1'>
                        {question.tags.map((tag, index) => (
                            <p className='h-fit py-0.5 px-2 rounded bg-gray-200 text-gray-600 text-xs font-semibold' key={index}>
                                {tag}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}