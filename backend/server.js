const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

// Let the React app (running on a different port) call this server
app.use(cors())
// Parse JSON request bodies
app.use(express.json())

// Homepage: visit http://localhost:3000 to check the server is running
app.get('/', (req, res) => {
  res.send('Backend is running!')
})

// GET endpoint: visit http://localhost:3000/api/type/fire (or a type id like /api/type/10)
app.get('/api/type/:type', async (req, res) => {
  const type = req.params.type.toLowerCase()

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`)

    // PokeAPI returns 404 for unknown types like "banana"
    if (!response.ok) {
      return res.status(response.status).json({ error: `Could not find type "${type}"` })
    }

    const data = await response.json()
    const { half_damage_to, double_damage_from } = data.damage_relations

    // Only send back the type names, e.g. ["rock", "fire", "water", "dragon"]
    res.json({
      half_damage_to: half_damage_to.map((t) => t.name),
      double_damage_from: double_damage_from.map((t) => t.name),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to reach PokeAPI' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
