import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landingpage from "./pages/Landingpage";
import LoginSignup from "./pages/LoginSignup";
import Cart from "./pages/Cart";
import CreateAccount from "./components/CreateAccountForm/CreateAccount";
import Service from "./components/Service";
import Infopage from "./components/Infopage";
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
import CategoriesPage from "./pages/CategoriesPage";
import UserList from "./components/Users/UserList";
import ForgotPasswordForm from "./components/ForgetPassword";
import NotFound from "./components/NotFound";
import { Payment } from "./payment/UserPayment";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/authContext";
import LoginAdmin from "./layout/Login";
import MyOrders from "./components/myorders";
import Receipt from "./components/Receipt";
import VerifyEmail from "./components/VerifyEmail";
import CheckEmail from "./components/CheckEmail";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginAdminPage = location.pathname === "/login-admin";
  const isDashboardPage = location.pathname === "/admin/dashboard";
  const isNotFoundPage = location.pathname === "/404";
  const isLandingPage = location.pathname === "/";
  const isCheckoutPage = location.pathname === "/checkout";
  const shouldShowNavbar =
    !isAdminRoute && !isLoginAdminPage && !isDashboardPage && !isCheckoutPage;
  const shouldShowFooter =
    !isAdminRoute && !isNotFoundPage && !isLandingPage && !isCheckoutPage;

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Landingpage />} />
        {/* <Route path="/infopage" element={<Infopage />} /> */}
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
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
        <Route path="/payment" element={<Payment />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoute isAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="product" element={<ProductsPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="users" element={<UserList />} />
          </Route>
        </Route>
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}

export default AppWrapper;
