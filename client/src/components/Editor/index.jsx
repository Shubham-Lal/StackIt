import Toolbar from './Toolbar'

const Editor = ({ editorRef, setContent, selectionRef, pendingImagesRef }) => {
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
                className='editor'
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onMouseUp={saveSelection}
                onKeyUp={saveSelection}
            />
        </div>
    )
}

export default Editor