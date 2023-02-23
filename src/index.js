import React from 'react';
import ReactDOM from 'react-dom/client';

import 'style/index.css';
import 'style/item_lookup.css';

import { Tracker } from 'components/Tracker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Tracker));