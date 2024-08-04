import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import AdminLayout from "./layout/AdminLayout";
import ProductsPage from "./pages/Product";
import Dashboard from "./components/Dashboard";
import ProfileManager from "./components/profileManager";
import OrderList from "./components/Orders/OrderList";
import CategoriesPage  from "./pages/CategoriesPage"
import UserList from "./components/Users/UserList";
import ForgotPasswordForm from "./components/ForgetPassword"; // Add this import

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/penproduct" element={<Penproduct />} />
        <Route path="/service" element={<Service />} />
        <Route path="/construction" element={<Construction />} />
        <Route path="/food" element={<Food />} />
        <Route path="/infopage" element={<Infopage />} />
        <Route path="/profile" element={<ProfileManager />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordForm />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="product" element={<ProductsPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      {!isAdminRoute && !isLandingPage && <Footer />}
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
