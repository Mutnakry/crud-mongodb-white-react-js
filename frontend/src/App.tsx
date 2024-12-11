import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './view/User';
import UpdateUser from './view/UpdateUser'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="updateuser/:id" element={<UpdateUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
