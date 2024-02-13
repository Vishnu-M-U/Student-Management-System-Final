import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AddUser from './users/AddUser';
import UpdateUser from './users/UpdateUser';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/adduser" element={<AddUser/>}/>
          <Route exact path="/UpdateUser/:id" element={<UpdateUser />} />
          
        </Routes>
          <Footer/>
        
      </Router>
      
    </div>
  );
}

export default App;
