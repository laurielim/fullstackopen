import './App.css';
import React, {useState} from 'react';

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
      <button onClick={()=>update(good, setGood)}>good</button>
      <button onClick={()=>update(neutral, setNeutral)}>neutral</button>
      <button onClick={()=>update(bad, setBad)}>bad</button>
    </section>
    <section>
      <h2>Statistics</h2>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
        <li>all {all}</li>
        <li>average {((good * 1) + (bad * - 1))/all ? ((good * 1) + (bad * - 1))/all : 0}</li>
        <li>positve {((good * 1) / all) * 100 ? ((good * 1) / all) * 100 : 0}%</li>
      </ul>
    </section>
      
    </>
  )
}

export default App;
