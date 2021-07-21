import React from "react";

import Statistic from "./Statistic";

const Statistics = ({good, neutral, bad, all}) => {

const stats = () => (
    <ul>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={((good * 1) + (bad * - 1))/all}/>
        <Statistic text="positive" value={(((good * 1) / all) * 100)+"%"}/>
    </ul>)

    return (
    <section>
      <h2>Statistics</h2>
      {all ? stats() : <p>No feedbback give</p>}
    </section>)
  }

  export default Statistics