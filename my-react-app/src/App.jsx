import { useState } from 'react'

const types = [
  { name: 'Fire', icon: '🔥', color: 'from-orange-400 to-red-500', ring: 'ring-orange-300' },
  { name: 'Water', icon: '💧', color: 'from-sky-400 to-blue-600', ring: 'ring-sky-300' },
  { name: 'Fairy', icon: '✨', color: 'from-pink-300 to-fuchsia-500', ring: 'ring-pink-300' },
  { name: 'Steel', icon: '⚙️', color: 'from-slate-300 to-slate-500', ring: 'ring-slate-300' },
]

function App() {
  const [selected, setSelected] = useState(null)

  function getMatchup(type) {
  // API CALL WILL GO HERE, AND WE WILL RETURN THE RESPONSE
  return `Fake API response: You are fighting a ${type}-type Pokémon.`;
}

function handleTypeClick(type) {
  const response = getMatchup(type);
  setResult(response);
}
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-red-50 flex items-center justify-center p-4 font-display">
      <main className="w-full max-w-md rounded-3xl bg-white shadow-2xl shadow-red-900/10 overflow-hidden">
        <header className="relative bg-linear-to-b from-red-500 to-red-600 px-8 pt-10 pb-14 text-center">
          <p className="text-red-100 text-sm font-medium tracking-widest uppercase">Trainer Tools</p>
          <h1 className="mt-1 text-3xl font-bold text-white drop-shadow-sm">Battle Assistant</h1>
          <div className="absolute inset-x-0 bottom-0 h-3 translate-y-1/2 bg-slate-900" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 size-14 rounded-full bg-slate-900 grid place-items-center">
            <div className="size-9 rounded-full bg-white ring-4 ring-slate-200 grid place-items-center">
              <div className="size-3 rounded-full bg-slate-200" />
            </div>
          </div>
        </header>

        <section className="px-8 pt-14 pb-8">
          <p className="text-center text-lg font-medium text-slate-700">
            What type are you fighting?
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {types.map((type) => {
              const isSelected = selected === type.name
              return (
                <button
                  key={type.name}
                  onClick={() => handleTypeClick(type.name)}                  className={`group flex items-center gap-3 rounded-2xl bg-linear-to-br ${type.color} px-4 py-3 text-left text-white font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 cursor-pointer ${
                    isSelected ? `ring-4 ${type.ring} ring-offset-2` : ''
                  }`}
                >
                  <span className="grid size-9 place-items-center rounded-full bg-white/25 text-lg">
                    {type.icon}
                  </span>
                  {type.name}
                </button>
              )
            })}
          </div>
          <p className="mt-6 h-6 text-center text-slate-500">
            {selected ? <>Opponent type: <span className="font-semibold text-slate-800">{selected}</span></> : 'Pick a type to get started'}
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
