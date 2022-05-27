import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Details from './pages/Details';
import List from './pages/ShowList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/detail/:id' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
