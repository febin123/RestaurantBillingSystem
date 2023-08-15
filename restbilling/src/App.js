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
          <Route path='/home' element={ <ProtectedRoute> <Homepage/></ProtectedRoute>}/>
          <Route path='/items' element={<ProtectedRoute><ItemPage/></ProtectedRoute>}/>
          <Route path='/tables' element={<ProtectedRoute><TablePage/></ProtectedRoute>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Login/>}/>


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