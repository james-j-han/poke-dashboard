

function SummaryItem({ label, pokemon, getValue }) {

    const average = pokemon.length > 0
        ? Math.round(pokemon.reduce((sum, p) => sum + getValue(p), 0) / pokemon.length)
        : 0;

    return (
        <div className="summary-item">
            <p>{label}</p>
            <p>{average}</p>
        </div>
    )
}

export default SummaryItem;