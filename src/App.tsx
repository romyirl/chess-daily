import { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'

const game = new Chess()

function App() {
  const [position, setPosition] = useState(game.fen())

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

    setPosition(game.fen())
    return true
  }

return (
    <div style={{ width: '400px', margin: '40px auto' }}>
      <h1>Chess Daily</h1>
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