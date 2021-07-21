import React from "react";

const Statistics = ({good, neutral, bad, all}) => {
    return <section>
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


  }

  export default Statistics