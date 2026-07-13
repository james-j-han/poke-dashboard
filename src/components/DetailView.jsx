import { useEffect, useState } from "react";
import { useParams } from "react-router";

const BASE_URL = 'https://pokeapi.co/api/v2';

function DetailView() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    const [flavorText, setFlavorText] = useState(null);
    const [flavorLoading, setFlavorLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemon() {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/pokemon/${id}`);
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

    // fetch species and flavor text
    useEffect(() => {
        if (!pokemon) return;

        async function fetchSpecies() {
            setFlavorLoading(true);
            try {
                const res = await fetch(pokemon.species.url);
                const data = await res.json();

                // grab the first English one
                const entry = data.flavor_text_entries.find((e) => e.language.name === 'en');

                setFlavorText(entry.flavor_text);
            } catch (error) {
                console.error('Something went wrong fetching species: ', error);
                setFlavorText(null);
            } finally {
                setFlavorLoading(false);
            }
        }

        fetchSpecies();
    }, [pokemon]);

    if (loading) return <p>Loading...</p>;
    if (!pokemon) return <p>Pokemon not found.</p>;

    const shinyAvailable = pokemon.sprites.front_shiny;

    return (
        <div className="detail-container">
            <h2>{pokemon.name}</h2>

            <div className="sprite-section">
                <img src={pokemon.sprites.front_default} />
                {pokemon.sprites.front_shiny && (
                    <img src={pokemon.sprites.front_shiny} />
                )}
            </div>

            {flavorLoading ? (
                <p>Loading description...</p>
            ) : (
                flavorText && <p className="flavor-text">{flavorText}</p>
            )}

            <div className="abilities-section">
                <h3>Abilities</h3>
                <ul>
                    {pokemon.abilities.map((a) => (
                        <li key={a.ability.name}>{a.ability.name}</li>
                    ))}
                </ul>
            </div>

            <div className="stats-section">
                <h3>Stats</h3>
                <ul>
                    {pokemon.stats.map((s) => (
                        <li key={s.stat.name}>
                            {s.stat.name}: {s.base_stat}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DetailView;