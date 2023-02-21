import React from 'react';
import ReactDOM from 'react-dom/client';

import 'index.css';
import 'style/item_lookup.css';

import { Tracker } from 'components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Tracker));