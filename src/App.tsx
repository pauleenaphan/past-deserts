import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { Home } from './pages/Home';
import { Dessert } from './pages/Dessert';
import { Footer } from './components/Footer';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dessert/:id" element={<Dessert/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
