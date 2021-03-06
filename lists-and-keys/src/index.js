import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { Blog, posts } from './Blog';

const applications = {
  'App': (<React.StrictMode><App /></React.StrictMode>),
  'Blog': (<Blog posts={posts} />),
}

ReactDOM.render(
  applications['App'],
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
