const Toolbar = ({ editorRef, pendingImagesRef }) => {
    const format = (command, value = null) => {
        document.execCommand(command, false, value)
        editorRef.current.focus()
    }

    const insertEmoji = () => {
        format('insertText', '😊')
    }

    const insertLink = () => {
        const url = prompt('Enter URL:')
        if (url) format('createLink', url)
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const blobUrl = URL.createObjectURL(file)

        pendingImagesRef.current.push({ file, blobUrl })

        const img = document.createElement('img')
        img.src = blobUrl
        img.alt = 'Uploaded'
        img.style.maxWidth = '100%'
        img.style.display = 'inline-block'

        const selection = window.getSelection()
        const editor = editorRef.current

        editor.focus()

        if (!selection.rangeCount || !editor.contains(selection.anchorNode)) {
            editor.appendChild(img)
        } else {
            const range = selection.getRangeAt(0)
            range.deleteContents()
            range.insertNode(img)

            range.setStartAfter(img)
            range.setEndAfter(img)
            selection.removeAllRanges()
            selection.addRange(range)
        }

        const event = new Event('input', { bubbles: true })
        editor.dispatchEvent(event)

        e.target.value = ''
    }

    return (
        <div className='toolbar'>
            <button onClick={() => format('bold')}><b>B</b></button>
            <button onClick={() => format('italic')}><i>I</i></button>
            <button onClick={() => format('strikeThrough')}><s>S</s></button>
            <button onClick={() => format('insertOrderedList')}>Numbered List</button>
            <button onClick={() => format('insertUnorderedList')}>Bullet List</button>
            <button onClick={insertEmoji}>Emoji</button>
            <button onClick={insertLink}>Hyperlink</button>
            <button onClick={() => format('justifyLeft')}>Left Align</button>
            <button onClick={() => format('justifyCenter')}>Center Align</button>
            <button onClick={() => format('justifyRight')}>Right Align</button>
            <label className='upload-btn'>
                Upload Image
                <input
                    type='file'
                    accept='image/*'
                    hidden
                    onChange={handleImageUpload}
                />
            </label>
        </div>
    )
}

export default Toolbar