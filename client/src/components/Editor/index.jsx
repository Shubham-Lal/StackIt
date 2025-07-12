import { useRef, useState } from 'react'
import Toolbar from './Toolbar'

const Editor = () => {
    const editorRef = useRef(null)
    const [content, setContent] = useState('')
    const selectionRef = useRef(null)
    const pendingImagesRef = useRef([])

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

    const handleSave = async () => {
        let html = content

        for (const { file, blobUrl } of pendingImagesRef.current) {
            const formData = new FormData()
            formData.append('image', file)

            const response = await fetch('http://localhost:5000/upload-image', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            const serverUrl = data.url

            html = html.replaceAll(blobUrl, serverUrl)
        }

        await fetch('http://localhost:5000/save-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html })
        })

        pendingImagesRef.current = []
        alert('Saved successfully!')
    }

    return (
        <div className='container'>
            <Toolbar
                editorRef={editorRef}
                pendingImagesRef={pendingImagesRef}
            />
            <div
                ref={editorRef}
                className='editor'
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onMouseUp={saveSelection}
                onKeyUp={saveSelection}
            />

            <button onClick={handleSave} style={{ marginTop: '1rem' }}>
                💾 Save
            </button>
        </div>
    )
}

export default Editor