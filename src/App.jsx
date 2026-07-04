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

  function getRandomId() {
    return Math.floor(Math.random() * 1000) + 1;
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
    <>
      <Dashboard pokemon={pokemon} />
    </>
  )
}

export default App
