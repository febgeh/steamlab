import React from 'react';
import Login from './assets/Login';
import Navbar from './assets/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './assets/Profile';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <div className="App">
          <Navbar />
          <div className='content'>
            <Routes>
              <Route path='/' Component={Login}></Route>
              <Route path='/Profile' Component={Profile}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
