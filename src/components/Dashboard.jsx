import { useOutletContext } from 'react-router';
import { useState } from 'react'
import SummaryItem from './SummaryItem'
import FilterPanel from './FilterPanel'
import Item from './Item'

function Dashboard() {
    const { pokemon } = useOutletContext();
    // track what the user types
    const [searchTerm, setSearchTerm] = useState('');

    // track which types user selects
    const [selectedTypes, setSelectedTypes] = useState([]);

    const [statFilters, setStatFilters] = useState({
        weight: { operator: 'gte', value: '' },
        height: { operator: 'gte', value: '' },
        base_stat: { operator: 'gte', value: '' },
    });

    function handleStatFilterChange(field, operator, value) {
        // keep previous statFilters and only overwrite the one that changed
        // we are using the spread operator inside {}, which behaves differently than lists []
        // this will create a copy and instead of adding to it, will overwrite the matching key
        // this way we are constantly updating filters while keeping reference to current filters
        setStatFilters((prev) => ({
        ...prev,
        [field]: { operator, value }
        }));
    }

    const operators = {
        gt: (a, b) => a > b,
        gte: (a, b) => a >= b,
        lt: (a, b) => a < b,
        lte: (a, b) => a <= b,
        eq: (a, b) => a === b,
    };

    const filteredPokemon = pokemon
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        // if selectedTypes is empty show everything
        .filter((p) => selectedTypes.length === 0 || p.types.some((t) => selectedTypes.includes(t.type.name)))
        .filter((p) => statFilters.weight.value === '' || operators[statFilters.weight.operator](p.weight, Number(statFilters.weight.value)))
        .filter((p) => statFilters.height.value === '' || operators[statFilters.height.operator](p.height, Number(statFilters.height.value)))
        .filter((p) => statFilters.base_stat.value === '' || operators[statFilters.base_stat.operator](p.stats[0].base_stat, Number(statFilters.base_stat.value))
    );

    // get a list of unique types in the fetched data
    // map over the data and retrieve the types which may return a nested array (more than 1 type for a pokemon)
    // flatten to collapse nested arrays into one level
    // create a set to remove duplicates and convert back to an array/list with the spread operator
    const uniqueTypes = [...new Set(pokemon.flatMap((p) => p.types.map((t) => t.type.name)))];

    function toggleType(type) {
        // remove type if already selected or add if not selected
        setSelectedTypes(selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type]
        );
    }

    return (
        <div className='dashboard-container'>
            <FilterPanel
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedTypes={selectedTypes}
                toggleType={toggleType}
                uniqueTypes={uniqueTypes}
                onStatFilterChange={handleStatFilterChange}
            />
            <div className='summary-container'>
                <SummaryItem label='Average Weight' pokemon={filteredPokemon} getValue={(p) => p.weight} />
                <SummaryItem label='Average Height' pokemon={filteredPokemon} getValue={(p) => p.height} />
                <SummaryItem label='Average Base Stat' pokemon={filteredPokemon} getValue={(p) => p.stats[0].base_stat} />
            </div>
            <div className="item-header">
                <span>Sprite</span>
                <span>Name</span>
                <span>Weight</span>
                <span>Height</span>
                <span>Base Stat</span>
                <span>Type</span>
            </div>
            <div className='item-container'>
                <Item pokemon={filteredPokemon} />
            </div>
        </div>
    )
}

export default Dashboard;