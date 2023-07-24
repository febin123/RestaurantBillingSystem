// import 'antd/dist/antd.min.css';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/items' element={<ItemPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
