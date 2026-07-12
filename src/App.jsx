import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import Header from './components/Header'

// App.jsx will be the shell containing the routes
// Outlet is what we are swapping between while Header remains constant

// declare outside component as it has no react dependency, purely utility
const BASE_URL = 'https://pokeapi.co/api/v2';

function getUniqueRandomIds(count) {
    // create a set so we ignore duplicates automatically and prevent key duplicates in Item component
    const ids = new Set();

    // loop until set is of size count
    while (ids.size < count) {

      // PokeAPI has a 1300-1400 ids, we use a base number of 1000 which should be plenty of unqiue Pokemon
      ids.add(Math.floor(Math.random() * 1000) + 1);
    }

    // convert set to list
    return [...ids];
    // return Math.floor(Math.random() * 1000) + 1;
  }

function App() {
  const [pokemon, setPokemon] = useState([]);

  // fetch data once on load/mount
  useEffect(() => {
      async function fetchPokemon() {
      try {
          // generate array of random IDs
          // could improve to avoid duplicates but rare with 1000
          const ids = getUniqueRandomIds(50);

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
      <Header />
      <Outlet context={{ pokemon }}/>
    </div>
  )
}

export default App
