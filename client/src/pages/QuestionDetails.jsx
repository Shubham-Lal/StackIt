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

    if (isLoading) return <div className='py-8 px-24'>Loading...</div>
    else if (!question?._id) return <div className='py-8 px-24 text-red-600'>Question not found</div>
    return (
        <div className='py-8 px-24'>
            Question Page
        </div>
    )
}