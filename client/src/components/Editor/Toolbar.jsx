import {
    MdFormatListNumbered,
    MdFormatListBulleted,
    MdLink,
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
    MdImage
} from "react-icons/md"

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
            <button onClick={() => format('insertOrderedList')}><MdFormatListNumbered size={22} /></button>
            <button onClick={() => format('insertUnorderedList')}><MdFormatListBulleted size={22} /></button>
            <button onClick={insertEmoji}>😊</button>
            <button onClick={insertLink}><MdLink size={22} /></button>
            <button onClick={() => format('justifyLeft')}><MdFormatAlignLeft size={22} /></button>
            <button onClick={() => format('justifyCenter')}><MdFormatAlignCenter size={22} /></button>
            <button onClick={() => format('justifyRight')}><MdFormatAlignRight size={22} /></button>
            <label className='upload-btn'>
                <MdImage size={22} />
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