import React, { useState, useEffect } from 'react';

const Hint = ({ movie, resetSignal }) => {
  const [hintStep, setHintStep] = useState(0);

  const revealHint = () => {
    setHintStep(hintStep + 1);
  };

  // Reset the hintStep when resetSignal changes
  useEffect(() => {
    setHintStep(0);
  }, [resetSignal]);

  // Function to redact the movie title from the description
  const redactTitle = (description, title) => {
    const regex = new RegExp(title, 'gi');
    return description.replace(regex, '[REDACTED]');
  };

  return (
    <div className="mt-4 text-white">
      <button
        onClick={revealHint}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
      >
        Reveal Hint
      </button>
      {hintStep >= 1 && (
        <p className="mt-4">
          <strong>Release Year:</strong> {movie.release_date.split('-')[0]}
        </p>
      )}
      {hintStep >= 2 && (
        <p className="mt-4">
          <strong>Description:</strong>{' '}
          {redactTitle(movie.overview, movie.title)}
        </p>
      )}
    </div>
  );
};

export default Hint;
