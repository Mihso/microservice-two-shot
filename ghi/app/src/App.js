import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatForm from './hats';
import HatList from './hatList';
import HatDelete from './hatDelete';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='/hats/delete/' element={<HatDelete/>}/>
          <Route path="/hats" element={<HatList />} />
          <Route path="/hats/new/" element={<HatForm/>} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
