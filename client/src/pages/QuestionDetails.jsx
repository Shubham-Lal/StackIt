import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

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
            Question Page
        </div>
    )
}