import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatForm from './hats';
import HatList from './hatList';
import HatDelete from './hatDelete';
import ShoeDelete from './shoeDelete';
import ShoeForm from './shoes';
import ShoeList from './shoeList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='/shoes/delete/' element={<ShoeDelete/>}/>
          <Route path='/hats/delete/' element={<HatDelete/>}/>
          <Route path="/hats" element={<HatList />} />
          <Route path="/shoes" element={<ShoeList/>}/>
          <Route path="/hats/new/" element={<HatForm/>} />
          <Route path="shoes/new/" element={<ShoeForm/>} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
