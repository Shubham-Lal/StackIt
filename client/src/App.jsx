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
import Home from './components/pages/Home/Home'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Home />} />
        {/* <Route path='/auth' element={<Auth />}>
          <Route path='login' element={<SignInForm />} />
          <Route path='recovery' element={<ForgotPass />} />
          <Route path='verify' element={<Verify />} />
          <Route element={<ValidLink />}>
            <Route path='reset' element={<ResetPass />} />
          </Route>
          <Route path='*' element={<NotFound path='auth' />} />
        </Route> */}
        {/* <Route element={<Protected />}>
          <Route path='worker' element={<Worker />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='jobs' element={<Jobs />}>
              <Route path='enroll/:jobId' element={<EnrollJob />} />
            </Route>
            <Route path='payment' element={<Payment />} />
            <Route path='attendance' element={<Attendance />} />
            <Route path='*' element={<NotFound path='worker' />} />
          </Route>
          <Route path='admin' element={<Admin />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='jobs' element={<AdminJobs />}>
              <Route index element={<ViewJobs />} />
              <Route path='add' element={<AddJob />} />
            </Route>
            <Route path='attendance' element={<AdminAttendance />}>
              <Route path='job/:jobId' element={<JobAttendance />} />
            </Route>
            <Route path='workers' element={<Employee />}>
              <Route index element={<ViewEmployees />} />
              <Route path='add' element={<Progress />} />
              <Route path='edit/:id' element={<EditEmployee />} />
            </Route>
            <Route path='payout' element={<Payout />} />
            <Route path='profile' element={<AdminProfile />} />
            <Route path='*' element={<NotFound path='admin' />} />
          </Route>
        </Route> */}
        <Route path='*' element={<NotFound path='*' />} />
      </Routes>
    </BrowserRouter>
  )
}
