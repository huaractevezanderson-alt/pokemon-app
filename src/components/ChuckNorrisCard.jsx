import { useState, useEffect } from 'react'
import { getRandomJoke } from '../services/api'

function ChuckNorrisCard() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchJoke = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getRandomJoke()
      setJoke(data)
    } catch {
      setError('Error al cargar chiste')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Chuck Norris
      </h2>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-pulse text-4xl mb-4">💪</div>
          <p className="text-gray-600">Cargando chiste epico...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {joke && !loading && (
        <div className="text-center">
          <img
            src={joke.icon_url}
            alt="Chuck Norris"
            className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg"
          />
          <div className="bg-gray-50 rounded-xl p-6 mb-4 min-h-[100px] flex items-center justify-center">
            <p className="text-gray-800 text-lg italic">"{joke.value}"</p>
          </div>

          <button
            onClick={fetchJoke}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all shadow-lg"
          >
            Otro Chiste
          </button>
        </div>
      )}
    </div>
  )
}

export default ChuckNorrisCard