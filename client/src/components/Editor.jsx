export default function Editor({ editorRef, onInput, onSelect }) {
    return (
        <div
            ref={editorRef}
            className='editor'
            contentEditable
            suppressContentEditableWarning={true}
            onInput={onInput}
            onMouseUp={onSelect}
            onKeyUp={onSelect}
        >
        </div>
    )
}