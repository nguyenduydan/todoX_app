import {Toaster} from 'sonner'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
    <Toaster position='top-right' richColors/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
