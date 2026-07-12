import { Link } from "react-router";

function Item({ pokemon }) {
    return (
        <>
            {pokemon && pokemon.map((p) => (
                <Link to={`/pokemon/${p.id}`} className="item-row" key={p.id}>
                    <img src={p.sprites.front_default} />
                    <p>{p.name}</p>
                    <p>{p.weight}</p>
                    <p>{p.height}</p>
                    <p>{p.stats[0].base_stat}</p>
                    <p>{p.types.map((t) => t.type.name).join(', ')}</p>
                </Link>
            ))}
        </>
    )
}

export default Item;