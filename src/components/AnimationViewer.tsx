import React, { useState, useEffect } from 'react';
import { GridState } from '../types/GameState';
import { animateNextFrame } from '../engine';

import Grid from './Grid'

type Props = {
  framesPerSecond: number
  initialFrameState: GridState
}

const initialGeneration = 1;
const AnimationViewer = (props: Props) => {
  const { framesPerSecond, initialFrameState } = props;
  const [frameState, setFrameState] = useState(initialFrameState);
  const [generation, setGeneration] = useState(initialGeneration);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setGeneration(initialGeneration);
    setFrameState(initialFrameState)
    setIsActive(false);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout = setInterval(() => { }, 1);
    if (isActive) {
      interval = setInterval(() => {
        setGeneration(generation => generation + 1);
        setFrameState(animateNextFrame(frameState))
      }, 1000 / framesPerSecond);
    } else if (!isActive && generation !== initialGeneration) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, generation, framesPerSecond, frameState]);

  return (
    <>
      <div className="generation">
        Generation: {generation}
      </div>
      <Grid state={frameState} />
      <div className="row">
        <button onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default AnimationViewer;