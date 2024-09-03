import { useState } from 'react'
import './App.css'
import PosterReveal from './components/PosterReveal'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-4xl font-bold text-white mb-8">
        Can You Guess the Movie?
      </h1>
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <PosterReveal />
      </div>
    </div>
  )
}

export default App
