import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when diagnosing patients'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))  
  const [selected, setSelected] = useState(0)
  const [popular, setPopular] = useState(0)

  const getAnecdote = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * anecdotes.length)
    } while (randomIndex === selected);
    setSelected(randomIndex)
  }

  const updateVotes = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
    if (copy[selected] > votes[popular]) setPopular(selected);
  }

  return (
    <main>
      <h1>Anecdotes</h1>
    <section>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={updateVotes}>Vote</button>
      <button onClick={getAnecdote}>Next anecdote</button>
    </section>
    <section>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[popular]}</p>
      <p>has {votes[popular]} votes</p>
    </section>
    </main>
  )
}

export default App