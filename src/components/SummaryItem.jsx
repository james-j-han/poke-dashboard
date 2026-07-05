

function SummaryItem({ label, pokemon, getValue }) {

    const average = pokemon.length > 0
        ? Math.round(pokemon.reduce((sum, p) => sum + getValue(p), 0) / pokemon.length)
        : 0;

    return (
        <div className="summary-item">
            <h2>{label}</h2>
            <p>{average}</p>
        </div>
    )
}

export default SummaryItem;