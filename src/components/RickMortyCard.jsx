import { useState, useEffect } from 'react'
import { getRandomRMCharacter } from '../services/api'

function RickMortyCard() {
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCharacter = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getRandomRMCharacter()
      setCharacter(data)
    } catch {
      setError('Error al cargar personaje')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacter()
  }, [])

  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500'
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Rick & Morty
      </h2>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin text-4xl mb-4">🌀</div>
          <p className="text-gray-600">Viajando por el multiverso...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {character && !loading && (
        <div className="text-center">
          <img
            src={character.image}
            alt={character.name}
            className="w-44 h-44 mx-auto mb-3 rounded-full border-4 border-green-400 shadow-lg"
          />
          <h3 className="text-2xl font-bold mb-2 text-gray-800">{character.name}</h3>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`w-3 h-3 rounded-full ${statusColor[character.status]}`}></span>
            <span className="text-gray-700 font-medium">
              {character.status} - {character.species}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-600 font-medium">GENERO</p>
              <p className="font-bold text-gray-800">{character.gender}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-xs text-yellow-600 font-medium">ORIGEN</p>
              <p className="font-bold text-gray-800 text-sm">{character.origin.name}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-600 font-medium">UBICACION ACTUAL</p>
            <p className="font-bold text-gray-800">{character.location.name}</p>
          </div>

          <button
            onClick={fetchCharacter}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
          >
            Otro Personaje
          </button>
        </div>
      )}
    </div>
  )
}

export default RickMortyCard