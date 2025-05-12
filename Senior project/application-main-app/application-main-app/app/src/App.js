import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Home from './pages/Home';
import Saved from './pages/Saved';
import Trip from './pages/Trip';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate} from 'react-router-dom';



const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
const AppContent = () => {
  const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? children : <Navigate to="/"/>;
  };



  return (
    <div className="App">
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /> </ProtectedRoute>} />
        <Route path="/take-a-trip" element={<ProtectedRoute> <Trip /> </ProtectedRoute>} />
        <Route path="/saved-trips" element={<ProtectedRoute> <Saved /> </ProtectedRoute>} />
      </Routes>
    </div>
  );
}



const ConditionalNavbar = () => {
  const location = useLocation();
  const pagesWithNavbar = ["/home", "/take-a-trip", "/saved-trips"];

  return pagesWithNavbar.includes(location.pathname) ? <Navbar /> : null;
};

export default App;
