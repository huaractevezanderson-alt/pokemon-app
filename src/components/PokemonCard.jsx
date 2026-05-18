import { useState, useEffect } from 'react'
import { getPokemon, getRandomPokemon } from '../services/api'

function PokemonCard() {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [stats, setStats] = useState(null)

  const fetchRandomPokemon = async () => {
    setLoading(true)
    setError(null)
    setStats(null)
    try {
      const data = await getRandomPokemon()
      setPokemon(data)
      setStats(data.stats)
    } catch {
      setError('Error al cargar Pokemon')
    } finally {
      setLoading(false)
    }
  }

  const searchPokemon = async (e) => {
    e.preventDefault()
    if (!search.trim()) return
    setLoading(true)
    setError(null)
    setStats(null)
    try {
      const data = await getPokemon(search.toLowerCase().trim())
      setPokemon(data)
      setStats(data.stats)
    } catch {
      setError('Pokemon no encontrado')
      setPokemon(null)
      setStats(null)
    } finally {
      setLoading(false)
    }
  }

  const playCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest)
      audio.volume = 0.3
      audio.play()
    } else {
      alert('Este Pokemon no tiene sonido disponible')
    }
  }

  useEffect(() => {
    fetchRandomPokemon()
  }, [])

  const statNames = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Atq. Esp.',
    'special-defense': 'Def. Esp.',
    speed: 'Velocidad'
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Pokemon
      </h2>

      <form onSubmit={searchPokemon} className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar: pikachu, charizard..."
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition text-sm font-bold"
        >
          Buscar
        </button>
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-bounce text-4xl mb-4">⚡</div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {pokemon && !loading && (
        <div className="text-center">
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="w-44 h-44 mx-auto mb-3 drop-shadow-lg cursor-pointer hover:scale-110 transition"
            onClick={playCry}
            title="Click para escuchar su grito!"
          />
          <p className="text-xs text-gray-400 mb-1">Click en la imagen para escuchar</p>
          <h3 className="text-2xl font-bold capitalize mb-3 text-gray-800">
            #{pokemon.id} {pokemon.name}
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-600 font-medium">ALTURA</p>
              <p className="font-bold text-gray-800">{pokemon.height / 10} m</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-purple-600 font-medium">PESO</p>
              <p className="font-bold text-gray-800">{pokemon.weight / 10} kg</p>
            </div>
          </div>

          <div className="flex gap-2 justify-center mb-4">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm capitalize font-medium"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          {stats && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h4 className="font-bold text-gray-700 mb-3">Estadisticas</h4>
              <div className="space-y-2">
                {stats.map((stat) => (
                  <div key={stat.stat.name} className="text-left">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{statNames[stat.stat.name] || stat.stat.name}</span>
                      <span className="font-bold text-gray-800">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={fetchRandomPokemon}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
          >
            Pokemon Aleatorio
          </button>
        </div>
      )}
    </div>
  )
}

export default PokemonCard