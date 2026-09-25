import { useState } from 'react'

const types = [
  { name: 'Fire', dot: 'bg-orange-500', border: 'border-orange-500' },
  { name: 'Water', dot: 'bg-sky-500', border: 'border-sky-500' },
  { name: 'Fairy', dot: 'bg-pink-400', border: 'border-pink-400' },
  { name: 'Steel', dot: 'bg-zinc-400', border: 'border-zinc-400' },
]

// ["rock", "fire"] -> "Rock, Fire"
function formatTypes(list) {
  if (!list || list.length === 0) return 'None'
  return list.map((t) => t[0].toUpperCase() + t.slice(1)).join(', ')
}

function App() {
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)

  async function getMatchup(type) {
    try {
      const response = await fetch(`http://localhost:5001/api/type/${type}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
      return { error: 'Could not reach the backend. Is it running?' }
    }
  }

  async function handleTypeClick(type) {
    setSelected(type)
    const response = await getMatchup(type)
    setResult(response)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-display text-zinc-300">
      <main className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <header className="flex items-center gap-3">
          <div className="size-6 rounded-full border-2 border-zinc-950 bg-linear-to-b from-red-500 from-50% to-zinc-100 to-50% ring-1 ring-zinc-700" />
          <h1 className="text-xl font-semibold text-zinc-100">Battle Assistant</h1>
        </header>

        <p className="mt-8 text-sm text-zinc-500">What type are you fighting?</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {types.map((type) => {
            const isSelected = selected === type.name
            return (
              <button
                key={type.name}
                onClick={() => handleTypeClick(type.name)}
                className={`flex items-center gap-3 rounded-lg border bg-zinc-800/50 px-4 py-3 text-left font-medium transition-colors cursor-pointer hover:bg-zinc-800 ${
                  isSelected ? `${type.border} text-zinc-100` : 'border-zinc-800 text-zinc-400'
                }`}
              >
                <span className={`size-2.5 rounded-full ${type.dot}`} />
                {type.name}
              </button>
            )
          })}
        </div>

        {result && (
          <div className="mt-6 border-t border-zinc-800 pt-6 space-y-4">
            {result.error ? (
              <p className="text-sm text-red-400">{result.error}</p>
            ) : (
              <>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Attack with</p>
                  <p className="mt-1 text-zinc-100">{formatTypes(result.double_damage_from)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Safe to send out</p>
                  <p className="mt-1 text-zinc-100">{formatTypes(result.half_damage_to)}</p>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
