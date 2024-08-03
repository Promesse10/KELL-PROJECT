// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Food from './Components/Food';
// import Construction from './Components/Construction';
// import Cart from './Components/Cart';
// import Dashboard from './Components/Dashboard/Dashboard';
// import Products from './Components/Dashboard/Products';
// import Orders from './Components/Dashboard/Orders';
// import Customers from './Components/Dashboard/Customers';
// import Transactions from './Components/Dashboard/Transactions';
// import Messages from './Components/Dashboard/Messages';

// const App = () => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (item) => {
//     const existingItem = cart.find(cartItem => cartItem.name === item.name);
//     if (existingItem) {
//       setCart(cart.map(cartItem =>
//         cartItem.name === item.name
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       ));
//     } else {
//       setCart([...cart, item]);
//     }
//   };

//   const updateCart = (newCart) => {
//     setCart(newCart);
//   };

//   return (
//     <Router>
//       <div className="flex">
//         <div className="w-1/4 h-screen bg-gray-800 text-white">
//           <nav className="flex flex-col p-4">
//             <Link to="/dashboard" className="mb-4">Dashboard</Link>
//             <Link to="/products" className="mb-4">Products</Link>
//             <Link to="/orders" className="mb-4">Orders</Link>
//             <Link to="/customers" className="mb-4">Customers</Link>
//             <Link to="/transactions" className="mb-4">Transactions</Link>
//             <Link to="/messages" className="mb-4">Messages</Link>
//           </nav>
//         </div>
//         <div className="w-3/4 p-4">
//           <Routes>
//             <Route path="/" element={<Food addToCart={addToCart} />} />
//             <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/customers" element={<Customers />} />
//             <Route path="/transactions" element={<Transactions />} />
//             <Route path="/messages" element={<Messages />} />
//             <Route path="/construction" element={<Construction />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
