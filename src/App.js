import './App.css'
import {Dashboard,Login,Create,Signup,Project} from './pages/index';
import { Navbar, Sidebar } from './components';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Sidebar/>
    <div className='container'>
     <Navbar/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/projects/:id' element={<Project/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
    </Routes>

    </div>

    </div>
  );
}

export default App
