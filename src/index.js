import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'style/index.css';
import 'style/item_lookup.css';

import { Tracker } from 'components/Tracker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tracker />} />
    </Routes>
  </BrowserRouter>
);