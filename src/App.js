import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Signup from './Components/Sign_log/Signup';
import Login from './Components/Sign_log/Login';
import Home from './Components/HomePage/Home';
import PrivateComponent from './Components/PrivateComponent/PrivateComponent';
import CartDetails from './Components/CartDetails/CartDetails';

function App() {
  return (
    <div className="App">
      <Header />


      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />


        <Route element={<PrivateComponent />}>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/cartdetails/:id' element={<CartDetails />}></Route>

        </Route>

      </Routes>
    </div>
  );
}

export default App;
