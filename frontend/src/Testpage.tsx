import React, { useState } from 'react';

// Define the product type
interface Product {
  id: number;
  name: string;
  des: string;
  product: number;
  price: number;
  like: number;
}

function Testpage() {
  // Define the array with the correct type
  const products: Product[] = [
    { id: 1, name: "ka", des: "yes", product: 21, price: 63, like: 10960 },
    { id: 112, name: "kla", des: "yes", product: 32, price: 53, like: 15400 },
    { id: 12141, name: "kaa", des: "yes", product: 23, price: 3, like: 454 },
    { id: 11231, name: "kalosa", des: "no", product: 2342, price: 6, like: 4566 },
    { id: 11, name: "we", des: "yes", product: 232, price: 234, like: 103450 },
    { id: 1241, name: "ma ta", des: "no", product: 2, price: 3234, like: 36346 },
    { id: 341, name: "baba", des: "yes", product: 54, price: 234, like: 8745 },
    { id: 43, name: "bada", des: "yes", product: 3, price: 90, like: 2001 },
    { id: 223, name: "kaak", des: "yes", product: 34, price: 60, like: 489 },
    { id: 123, name: "wa", des: "yes", product: 12, price: 456, like: 5400 },
    { id: 1233, name: "bka", des: "no", product: 121, price: 800, like: 200 },
    { id: 109876, name: "ka", des: "yes", product: 21, price: 63, like: 10960 },
    { id: 14312, name: "kla", des: "yes", product: 32, price: 53, like: 15400 },
    { id: 1652141, name: "kaa", des: "yes", product: 23, price: 3, like: 454 },
    { id: 1107231, name: "kalosa", des: "no", product: 2342, price: 6, like: 4566 },
    { id: 198761, name: "we", des: "yes", product: 232, price: 234, like: 103450 },
    { id: 1254341, name: "ma ta", des: "no", product: 2, price: 3234, like: 36346 },
    { id: 3121241, name: "baba", des: "yes", product: 54, price: 234, like: 8745 },
    { id: 43453, name: "bada", des: "yes", product: 3, price: 90, like: 2001 },
    { id: 2765423, name: "kaak", des: "yes", product: 34, price: 60, like: 489 },
    { id: 2, name: "wa", des: "yes", product: 12, price: 456, like: 5400 },
    { id: 121212333, name: "bka", des: "no", product: 121, price: 800, like: 200 },
  ];

  // Set up the state for the search query, current page, and items per page
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Set the default value to 5

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.des.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total number of pages based on the itemsPerPage and filtered products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get the products to display on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle change in the number of items per page
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page whenever items per page changes
  };

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        padding: '20px',
        textAlign: 'center'
     }} >
      <h1>Product List</h1>

      {/* Search input */}
      <div>
        <input
          type="text"
          placeholder="Search data ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
          style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
        />
        
        {/* Dropdown for selecting the number of items per page */}
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          style={{ padding: '10px', marginLeft: '10px' }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {/* Table displaying filtered products */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #ddd' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Price</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Likes</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>{product.name}</td>
              <td style={{ padding: '8px' }}>{product.des}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{product.price}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{product.like}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: '10px', margin: '5px' }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: '10px', margin: '5px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Testpage;
