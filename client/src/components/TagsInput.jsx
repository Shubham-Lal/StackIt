import { useState } from 'react'

const TagsInput = ({ tags, setTags }) => {
    const [input, setInput] = useState('')

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            e.preventDefault()
            const newTag = input.trim()
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag])
            }
            setInput('')
        }
    }

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    return (
        <div className='mb-4 w-full'>
            <p className='mb-2'>Tags</p>
            <div className='w-full flex flex-wrap gap-2 border border-gray-300 rounded-lg p-2 focus-within:border-amber-500'>
                {tags.map((tag, idx) => (
                    <div
                        key={idx}
                        className='flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm'
                    >
                        {tag}
                        <button
                            onClick={() => removeTag(tag)}
                            className='text-gray-600 hover:text-red-500 ml-1'
                            type='button'
                        >
                            ×
                        </button>
                    </div>
                ))}
                <input
                    className='flex-1 min-w-[120px] border-none focus:outline-none'
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Type tag and press Enter'
                />
            </div>
        </div>
    )
}

export default TagsInput