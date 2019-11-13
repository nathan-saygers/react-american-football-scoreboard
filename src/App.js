//TODO: STEP 1 - Import the useState hook.
import React, {useState} from "react";
import "./App.css";
import BottomRow from "./BottomRow";


function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  
  // You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [down, setDown] = useState(1);
  const [toGo, setToGo] = useState(10);
  const [ballOn, setBallOn] = useState(20);
  const [yards, setYards] = useState(0);

  const advanceQuarter = () => {
    if(quarter < 4){
      setQuarter(quarter + 1);
    } else {
      setQuarter(1);
    }
  } 

  const advanceDown = () => {
    if(down < 4){
      setDown(down + 1);
    } else {
      setDown(1);
      setToGo(10);
      setBallOn(20);
    }
  }

  const handleInput = (e) => {
    setYards(Number(e.target.value));
  }

  const advanceYards = (e) => {
    e.preventDefault();
    if(ballOn + yards > 99){
      setBallOn(20);
      setToGo(10);
    } else {
      setBallOn(ballOn + yards);
    }
    if((toGo - yards) < 1){
      setToGo(10);
      setDown(1);
    } else {
      setToGo(toGo - yards);
      advanceDown();
    }
  }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded 
            values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">00:03</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow quarter={quarter} down={down} toGo={toGo} ballOn={ballOn}/>
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button onClick={() => setHomeScore(homeScore + 7)} className="homeButtons__touchdown">Home Touchdown</button>
          <button onClick={() => setHomeScore(homeScore + 3)}className="homeButtons__fieldGoal">Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button onClick={() => setAwayScore(awayScore + 7)}className="awayButtons__touchdown">Away Touchdown</button>
          <button onClick={() => setAwayScore(awayScore + 3)}className="awayButtons__fieldGoal">Away Field Goal</button>
        </div>
        <div className="bottomRowButtons">
            <button onClick={advanceQuarter}>Advance Quarter</button>
            <button onClick={advanceDown}>Advance Down</button>
            <form onSubmit={advanceYards}><input onChange={handleInput} type="number" max="80"/></form>
        </div>
      </section>
    </div>
  );
}

export default App;
