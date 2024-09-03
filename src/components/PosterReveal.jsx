import React, { useState, useEffect } from 'react';
import Hint from './Hint'; // Import the Hint component

const PosterReveal = () => {
  const [movie, setMovie] = useState(null);
  const [revealed, setRevealed] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [resetSignal, setResetSignal] = useState(0); 
  const apiKey = import.meta.env.VITE_API_KEY; 

  useEffect(() => {
    fetchNewMovie();
  }, [apiKey]);

  const fetchNewMovie = () => {
    setLoading(true);
    setImageLoaded(false);
  
    const randomPage = Math.floor(Math.random() * 20) + 1; // Randomize page number between 1 and 20
  
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=hi&page=${randomPage}`)
      .then(response => response.json())
      .then(data => {
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        setMovie(randomMovie);
        setRevealed(0);
        setShowAnswer(false);
        setGuess('');
        setLoading(false);
        setResetSignal(resetSignal + 1); // Trigger the reset of the hint component
      });
  };
  

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const revealMore = () => {
    setRevealed(Math.min(revealed + 20, 100));
  };

  const checkGuess = () => {
    if (guess.toLowerCase() === movie.title.toLowerCase()) {
      setScore(score + (100 - revealed));
      setShowAnswer(true);
    } else {
      alert('Incorrect, try again!');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 min-h-screen">
      {movie && (
        <div className="text-center">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <p className="text-white">Loading...</p>
              </div>
            )}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onLoad={handleImageLoad}
              className={`mx-auto mb-4 mt-8 rounded-lg transition-all duration-500 ease-in-out w-72 ${
                showAnswer ? 'blur-0' : `blur-${(100 - revealed) / 4}`
              } ${loading || !imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              style={{
                filter: showAnswer ? 'none' : `blur(${(100 - revealed) / 4}px)`,
                transition: 'filter 0.5s, opacity 0.5s',
              }}
            />
            {showAnswer && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg text-white p-4">
                <p className="text-xl font-bold">{movie.title}</p>
              </div>
            )}
          </div>
          {!showAnswer && (
            <>
              <button
                onClick={revealMore}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Reveal More
              </button>
              <div className="mt-4">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Guess the movie"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <button
                  onClick={checkGuess}
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Submit Guess
                </button>
              </div>
            </>
          )}
          {showAnswer && (
            <button
              onClick={fetchNewMovie}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Next Movie
            </button>
          )}
          <p className="mt-4 text-lg text-white">Score: {score}</p>
          <Hint movie={movie} resetSignal={resetSignal} />
        </div>
      )}
    </div>
  );
};

export default PosterReveal;
