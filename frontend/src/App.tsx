import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './view/User';
import UpdateUser from './view/UpdateUser'
import Products from './view/Product';
import UpdateProduct from './view/UpdateProduct';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={< Products />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="updateuser/:id" element={<UpdateUser />} />
          <Route path="updateproduct/:id" element={<UpdateProduct />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
