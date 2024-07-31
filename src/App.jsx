import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import LoginSignup from "./pages/LoginSignup";
import Cart from "./pages/Cart";
import CreateAccount from "./components/CreateAccountForm/CreateAccount";
import Service from "./components/Service";
import Infopage from './components/Infopage';
import Hero from "./components/Hero";
import Aboutus from "./components/Aboutus";
import Contactus from "./components/Contactus";
import Construction from "./components/Construction";
import Food from "./components/Food";
import Terms from "./components/CreateAccountForm/terms";
import Penproduct from "./components/Penproduct";

function App() {
  const location = useLocation();
  const showFooter = location.pathname !== '/';

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/penproduct" element={<Penproduct />} />
        <Route path="/service" element={<Service />} />
        <Route path="/Construction" element={<Construction />} />
        <Route path="/infopage" element={<Infopage />} />
        <Route path="/Food" element={<Food />} />
        <Route path='/' element={<Landingpage />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/Hero' element={<Hero />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/contactus' element={<Contactus />} />
        <Route path='/terms' element={<Terms />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
