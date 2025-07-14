import { useState } from 'react'
import Toolbar from './Toolbar'

const Editor = ({ editorRef, setContent, selectionRef, pendingImagesRef }) => {
    const [isFocused, setIsFocused] = useState(false)


    const handleInput = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML)
        }
    }

    const saveSelection = () => {
        const selection = window.getSelection()
        if (selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0)
        }
    }

    return (
        <div className='editor-container'>
            <Toolbar
                editorRef={editorRef}
                pendingImagesRef={pendingImagesRef}
            />
            <div
                ref={editorRef}
                className={`editor min-h-[200px] p-4 rounded-lg border ${isFocused ? 'border-amber-500 outline-none' : 'border-gray-300'}`}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onMouseUp={saveSelection}
                onKeyUp={saveSelection}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    )
}

export default Editor