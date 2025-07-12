// import { useRef, useState } from 'react'
// import Editor from './components/Editor'
// import Toolbar from './components/Toolbar'

// export default function App() {
//   const editorRef = useRef(null)
//   const [content, setContent] = useState('')
//   const selectionRef = useRef(null)

//   const handleInput = () => {
//     if (editorRef.current) {
//       setContent(editorRef.current.innerHTML)
//     }
//   }

//   const saveSelection = () => {
//     const selection = window.getSelection()
//     if (selection.rangeCount > 0) {
//       selectionRef.current = selection.getRangeAt(0)
//     }
//   }

//   return (
//     <div className='container'>
//       <Toolbar
//         editorRef={editorRef}
//       />
//       <Editor
//         editorRef={editorRef}
//         onInput={handleInput}
//         onSelect={saveSelection}
//       />

//       <h3 style={{ marginTop: '2rem' }}>🔍 Live Preview:</h3>
//       <div
//         className='preview'
//         dangerouslySetInnerHTML={{ __html: content }}
//       />
//     </div>
//   )
// }

// import { Worker, Auth, Home, Admin } from './pages'
// import { Protected, NotFound, ValidLink } from './components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import About from './pages/About'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Main from './pages/Main'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='team' element={<Team />} />
          <Route path='contact' element={<Contact />} />
        </Route>
        <Route path='*' element={<NotFound path='*' />} />
      </Routes>
    </BrowserRouter>
  )
}
