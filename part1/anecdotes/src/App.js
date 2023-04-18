import { useState } from 'react';

const NEXT_ANECDOTE = 'next anecdote'
const VOTE = 'vote'
const ANECDOTE_HEADING = 'Anecdote of the day'
const MAX_VOTE_HEADING = 'Anecdote with most votes'
const NO_ANECDOTE_WITH_HIGHEST_VOTE = 'No anecdote to shown as there are no votes'

const getRandomNumber = (max) => Math.floor(Math.random() * max)

const Button = ({handleClick, text}) => <button type="button" onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const getInitVote = () => anecdotes.map((anecdote) => 0)

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(getInitVote())

  const handleNextAnecdoteClick = () => setSelected(getRandomNumber(anecdotes.length))
  const handleVoteClick = () => setVote(
    [
      ...vote.slice(0, selected),
      vote[selected] + 1,
      ...vote.slice(selected + 1),
    ]
  )

  const getAnecdoteWithMaxVoteIndex = () => {
    const maxVote = vote.reduce((maxSoFar, vote) =>
      vote > maxSoFar
        ? vote
        : maxSoFar,
      0,
    )
    return vote.findIndex((oneVote) => oneVote === maxVote)
  }


  const anecdoteWithMaxVoteIndex = getAnecdoteWithMaxVoteIndex()
  return (
    <div>
      <h1>{ANECDOTE_HEADING}</h1>
      <p>{anecdotes[selected]}</p>
      <p>{vote[selected]}</p>
      <Button handleClick={handleVoteClick} text={VOTE} />
      <Button handleClick={handleNextAnecdoteClick} text={NEXT_ANECDOTE} />
      <h1>{MAX_VOTE_HEADING}</h1>
      <p>
        {vote[anecdoteWithMaxVoteIndex] > 0
          ? anecdotes[anecdoteWithMaxVoteIndex]
          : NO_ANECDOTE_WITH_HIGHEST_VOTE
        }
      </p>
      <p>
        has {vote[anecdoteWithMaxVoteIndex]} votes
      </p>
    </div>
  )
}

export default App
