import React from 'react';

import useGameStateService from './services/useGameStateService'
import AnimationViewer from './components/AnimationViewer'
import './App.css';


function App() {
  
  const service = useGameStateService('http://localhost:3000/initialState.json');
  return (
    <div className="App">
      
        <div>
          {service.status === 'loading' && <div>Loading initial state...</div>}
          {service.status === 'loaded' && (
            <div>
              <h2>Mostly Happy Cells</h2> 
            <AnimationViewer framesPerSecond={14} initialFrameState={service.payload.state}></AnimationViewer>
            </div>
          )}
          {service.status === 'error' && <div>Error loading initial state</div>}
        </div>
      
    </div>
  );
}

export default App;
