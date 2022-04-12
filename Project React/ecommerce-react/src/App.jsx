import logo from './logo.svg';
import './App.css';
import LandingPage from './Pages/LandingPage';
import NavbarComponent from './Components/Navbar';
import Footer from './Components/Footer';

// FUNCTIONAL COMPONENT
// Initialize component
function App() {
  // function and data

  // return html component
  return (
    <div>
      <NavbarComponent />
      <LandingPage />
    </div>
  );
}

// Untuk mengeksport component agar dapat ditampilkan oleh virtualDOM react
export default App;
