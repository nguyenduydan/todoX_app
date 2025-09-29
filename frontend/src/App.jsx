import {Toaster} from 'sonner'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth';

function App() {

  return (
    <>
    <Toaster position='top-right' richColors/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
