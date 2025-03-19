import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Navbar from './components/Ui/Navbar'
import Login from './pages/Login/Login'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/chat/:id' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}
export default App