import React from 'react';

import useGameStateService from './services/useGameStateService'

import './App.css';


function App() {
  const service = useGameStateService('http://localhost:3000/initialState.json');
  return (
    <div className="App">
      
        <div>
          {service.status === 'loading' && <div>Loading initial state...</div>}
          {service.status === 'loaded' && (
            <div>
              <h2>{service.payload.id}</h2>
              <ul>
                <li>M: {service.payload.m}</li>
                <li>N: {service.payload.n}</li>
              </ul>
              {/* <Grid cells={service.payload.state} /> */}

            </div>
          )}
          {service.status === 'error' && <div>Error loading initial state</div>}
        </div>
      
    </div>
  );
}

export default App;
