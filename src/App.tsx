import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { fetchDailyPuzzle } from './puzzleService'

function App() {
  const [game, setGame] = useState(new Chess())
  const [position, setPosition] = useState('')
  const [solution, setSolution] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [solved, setSolved] = useState(false)
  const [whoToMove, setWhoToMove] = useState('')

  useEffect(() => {
    // async function goes w await function to load puzzle from lichess api 
    async function loadPuzzle() { 
      const puzzle = await fetchDailyPuzzle()
      console.log(puzzle)
      const newGame = new Chess(puzzle.fen)
      setGame(newGame)
      setPosition(puzzle.fen)
      setSolution(puzzle.solution)
      const parts = puzzle.fen.split(' ')
      const turn = parts[1]
      setWhoToMove(turn === 'w' ? 'White to move' : 'Black to move')
      setLoading(false)
    }
    loadPuzzle()
  }, [])

  function onDrop({ sourceSquare, targetSquare }: {
    sourceSquare: string
    targetSquare: string | null
  }) {
    if (!targetSquare) return false

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    })

    if (move === null) return false

    const newGame = new Chess(game.fen())
    setGame(newGame)
    setPosition(game.fen())

    const moveString = sourceSquare + targetSquare
    if (moveString === solution[0]) {
      setSolved(true)
    }

    return true
  }

  if (loading) return <div>Loading puzzle...</div>

  return (
    <div style={{ width: '400px', margin: '40px auto' }}>
      <h1>Chess Daily</h1>
      <p>{whoToMove}</p> 
      {solved && <p>✅ Puzzle Solved!</p>}
      <Chessboard
        options={{
          position: position,
          onPieceDrop: onDrop
        }}
      />
    </div>
  )
}

export default App