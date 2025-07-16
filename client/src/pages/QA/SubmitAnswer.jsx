import { useRef, useState } from 'react'
import { useQuestionStore } from '../../store/questionStore'
import { toast } from 'sonner'
import Editor from '../../components/Editor'

const SubmitAnswer = ({ question_id, setDetails }) => {
    const { questions, setQuestions } = useQuestionStore();

    const editorRef = useRef(null);
    const selectionRef = useRef(null);
    const pendingImagesRef = useRef([]);

    const [userAnswer, setUserAnswer] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

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

    return (
        <>
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
        </>
    )
}

export default SubmitAnswer