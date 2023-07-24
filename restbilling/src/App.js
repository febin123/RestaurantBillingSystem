// import 'antd/dist/antd.min.css';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import TablePage from './pages/TablePage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/items' element={<ItemPage/>}/>
          <Route path='/cart' element={<TablePage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
