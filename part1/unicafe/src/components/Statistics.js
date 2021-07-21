import React from "react";

const Statistics = ({good, neutral, bad, all}) => {

const stats = () => (
    <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
        <li>all {all}</li>
        <li>average {((good * 1) + (bad * - 1))/all}</li>
        <li>positve {((good * 1) / all) * 100}%</li>
    </ul>)

    return (
    <section>
      <h2>Statistics</h2>
      {all ? stats() : <p>No feedbback give</p>}
    </section>)


  }

  export default Statistics