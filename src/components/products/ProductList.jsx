// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import getProducts  from '../../slices/productSlice';

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const { products, status, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Products</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id} className="mb-2">
//             {product.name} - ${product.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;
