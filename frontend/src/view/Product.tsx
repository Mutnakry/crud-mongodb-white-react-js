// // src/components/Products.tsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// // src/types/Product.ts

// export interface Product {
//   _id: string;
//   names: string;
//   price: number;
//   sale_price: number;
//   Image: string;
//   detail: string;
//   category_id: {
//     _id: string;
//     names: string;
//     detail: string;
//   };
// }

// const Products: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products/');
//         setProducts(response.data);  // Store the fetched products
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching products');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchProducts();
//   }, []);  // Empty dependency array means this effect runs once after the first render

//   if (loading) {
//     return <div>Loading products...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h1>Products</h1>
//       <div>
//         <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Sale Price</th>
//               <th>Category</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id}>
//                 <td>{product._id}</td>
//                 <td>{product.names}</td>
//                 <td>${product.price}</td>
//                 <td>${product.sale_price}</td>
//                 <td>{product.category_id.names}</td>
//                 <td>
//                   <button>View</button>
//                   <td>
//                     <button onClick={() => window.confirm('Are you sure?') && deleteUser(product._id)}>
//                       Delete
//                     </button>
//                     <Link to={`/updatproduct/${product._id}`}>Update</Link>
//                   </td>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Products;




// src/components/Products.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// src/types/Product.ts
export interface Product {
  _id: string;
  names: string;
  price: number;
  sale_price: number;
  Image: string;
  detail: string;
  category_id: {
    _id: string;
    names: string;
    detail: string;
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/');
        setProducts(response.data);  // Store the fetched products
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);  // Empty dependency array means this effect runs once after the first render

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));  // Remove deleted product from state
    } catch (err) {
      setError('Error deleting product');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <div>
        <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Sale Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.names}</td>
                <td>${product.price}</td>
                <td>${product.sale_price}</td>
                <td>{product.category_id.names}</td>
                <td>{product.category_id.detail}</td>
                <td>
                  <button>View</button>
                  <button onClick={() => window.confirm('Are you sure?') && deleteProduct(product._id)}>
                    Delete
                  </button>
                  <Link to={`/updateproduct/${product._id}`}>Update</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
