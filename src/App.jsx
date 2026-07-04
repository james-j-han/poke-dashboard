import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Dashboard from './components/Dashboard'

const BASE_URL = 'https://pokeapi.co/api/v2';

function App() {

  const [pokemon, setPokemon] = useState([]);

  // track what the user types
  const [searchTerm, setSearchTerm] = useState('');

  // track which types user selects
  const [selectedTypes, setSelectedTypes] = useState([]);

  const filteredPokemon = pokemon
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    // if selectedTypes is empty show everything
    .filter((p) => selectedTypes.length === 0 || p.types.some((t) => selectedTypes.includes(t.type.name))
  );

  // get a list of unique types in the fetched data
  // map over the data and retrieve the types which may return a nested array (more than 1 type for a pokemon)
  // flatten to collapse nested arrays into one level
  // create a set to remove duplicates and convert back to an array/list with the spread operator
  const uniqueTypes = [...new Set(pokemon.flatMap((p) => p.types.map((t) => t.type.name)))];

  function getRandomId() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  function toggleType(type) {
    // remove type if already selected or add if not selected
    setSelectedTypes(selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    );
  }

  // fetch data once on load/mount
  useEffect(() => {
    async function fetchPokemon() {
      try {
        // generate array of 20 random IDs
        // could improve to avoid duplicates but rare with 1000
        const ids = Array.from({ length: 10 }, () => getRandomId());

        // promise over async/await to fetch multiple simultaneously
        const results = await Promise.all(
          ids.map((id) => fetch(`${BASE_URL}/pokemon/${id}`)
          .then((result) => result.json()))
        );

        setPokemon(results);
      } catch (error) {
        console.error('Something went wrong: ', error);
      }
    }

    fetchPokemon();
  }, [])

  return (
    <div className='main-container'>
      <input
        type='text'
        placeholder='Search Pokemon'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {uniqueTypes.map((type) => (
        <label key={type}>
          <input
            type='checkbox'
            checked={selectedTypes.includes(type)}
            onChange={() => toggleType(type)}
          />
          {type}
        </label>
      ))}
      <Dashboard pokemon={filteredPokemon} />
    </div>
  )
}

export default App
