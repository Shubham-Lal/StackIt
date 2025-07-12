import { useRef, useState } from 'react'
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'

export default function App() {
  const editorRef = useRef(null)
  const [content, setContent] = useState('')
  const selectionRef = useRef(null)

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
    <div className='container'>
      <Toolbar
        editorRef={editorRef}
      />
      <Editor
        editorRef={editorRef}
        onInput={handleInput}
        onSelect={saveSelection}
      />

      <h3 style={{ marginTop: '2rem' }}>🔍 Live Preview:</h3>
      <div
        className='preview'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}