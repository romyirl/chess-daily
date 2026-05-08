export async function fetchDailyPuzzle() {
  const response = await fetch('https://lichess.org/api/puzzle/daily')
  const data = await response.json()
  console.log('RAW DATA:', data)
  
  return {
    fen: data.puzzle.fen,
    solution: data.puzzle.solution,
    rating: data.puzzle.rating,
    id: data.puzzle.id
  }
}