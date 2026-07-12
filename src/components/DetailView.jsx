import { useEffect, useState } from "react";
import { useParams } from "react-router";

const BASE_URL = 'https://pokeapi.co/api/v2';

function DetailView() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemon() {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/pokemon/${id}`)
                const data = await res.json();
                setPokemon(data);
            } catch (error) {
                console.error('Something went wrong: ', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>
    };

    if (!pokemon) {
        return <p>Pokemon not found.</p>
    };

    return (
        <div className="detail-container">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} />
        </div>
    )
}

export default DetailView;

