import { useState } from 'react'
import PokemonCard from './components/PokemonCard'
import RickMortyCard from './components/RickMortyCard'
import ChuckNorrisCard from './components/ChuckNorrisCard'

function App() {
  const [activeTab, setActiveTab] = useState('pokemon')

  const tabs = [
    { id: 'pokemon', label: 'Pokemon', component: PokemonCard },
    { id: 'rickmorty', label: 'Rick & Morty', component: RickMortyCard },
    { id: 'chuck', label: 'Chuck Norris', component: ChuckNorrisCard }
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab).component

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <div className="flex gap-1 mb-6 bg-gray-800 p-1 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ActiveComponent />
      </div>
    </div>
  )
}

export default App