import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Details from './pages/Details';
import List from './pages/ShowList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<List />} />
          <Route path='detail'>
            <Route path=':slug/:id' element={<Details />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
