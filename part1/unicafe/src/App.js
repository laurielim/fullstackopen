import React, {useState} from 'react';

import './App.css';
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const update = (state, setFn) => {
    setFn(state + 1);
    setAll(all + 1);
  }
  

  return (
    <>
    <h1>UniCafe Feedback</h1>
    <section>
      <h2>Give feedback</h2>
      <Button update={update} text={"good"} state={good} setFn={setGood}/>
      <Button update={update} text={"neutral"} state={neutral} setFn={setNeutral}/>
      <Button update={update} text={"bad"} state={bad} setFn={setBad}/>
    </section>
    <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      
    </>
  )
}

export default App;
