import SummaryItem from './SummaryItem'
import Item from './Item'

function Dashboard({ pokemon }) {
    return (
        <div className='dashboard-container'>
            <div className='summary-container'>
                <SummaryItem label='Average Weight' pokemon={pokemon} getValue={(p) => p.weight} />
                <SummaryItem label='Average Height' pokemon={pokemon} getValue={(p) => p.height} />
                <SummaryItem label='Average Base Stat' pokemon={pokemon} getValue={(p) => p.stats[0].base_stat} />
            </div>
            <div className='item-container'>
                <div className="item-header">
                    <span>Sprite</span>
                    <span>Name</span>
                    <span>Weight</span>
                    <span>Height</span>
                    <span>Base Stat</span>
                    <span>Type</span>
                </div>
                <Item pokemon={pokemon} />
            </div>
        </div>
    )
}

export default Dashboard;