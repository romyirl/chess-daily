import { supabase } from './supabaseClient'

export async function fetchDailyPuzzle() {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('puzzles')
    .select('*')
    .eq('puzzle_date', today)
    .single()

  if (error) {
    console.error('Error fetching puzzle:', error)
    return null
  }

  return {
    fen: data.fen,
    solution: data.solution.split(','),
    rating: data.rating,
    themes: data.themes,
    difficulty: data.difficulty,
    id: data.id
  }
}