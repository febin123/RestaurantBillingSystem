// import 'antd/dist/antd.min.css';
import {BrowserRouter,Navigate,Route,Routes}from 'react-router-dom'
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import TablePage from './pages/TablePage';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/items' element={<ItemPage/>}/>
          <Route path='/tables' element={<TablePage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

//adding protected route
export function ProtectedRoute({children}){
  if(localStorage.getItem('BillingSystem')){
    return children
  }
  else{
    return <Navigate to='/login' />
  }
}