import React, { useState } from 'react';
import "../css/search.css";
export const SearchDestination = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    
    const response = await fetch(`https://api.example.com/destination-packages?q=${searchTerm}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search destination packages..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>

      <div className="results-container">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};