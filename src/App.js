// import logo from './logo.svg';
import Navbar from './components/Navbar'
import CodeForInterview from './components/CodeForInterview'
import AllUsers from './components/AllUser'
import AddUser from './components/AddUser'
import NotFound from './components/NotFound';
import EditUser from './components/EditUser';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
  <Router>
  <Navbar />
  <Routes>
  <Route exact path="/" element={ <CodeForInterview/> } />
  <Route  path="/all" element={ <AllUsers/> } />
  <Route  path="/add" element={ <AddUser/> } />
  <Route  path="/edit/:id" element={ <EditUser/> } />

  <Route  path="*" element={ <NotFound/> } />

  </Routes>
  </Router>
 
  );
}

export default App;
