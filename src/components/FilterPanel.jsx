import { useState } from 'react'
import OperatorSelect from './OperatorSelect'

function FilterPanel({ searchTerm, setSearchTerm, selectedTypes, toggleType, uniqueTypes, onStatFilterChange }) {
    const [heightOperator, setHeightOperator] = useState('gte');
    const [heightValue, setHeightValue] = useState('');
    const [weightOperator, setWeightOperator] = useState('gte');
    const [weightValue, setWeightValue] = useState('');
    const [baseStatOperator, setBaseStatOperator] = useState('gte');
    const [baseStatValue, setBaseStatValue] = useState('');

    function handleStatChange(field, operator, value) {
        onStatFilterChange(field, operator, value);
    }

    return (
        <div className='filter-container'>
            <div className='search-filter'>
                <input
                    type='text'
                    placeholder='Search Pokemon'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className='type-filters'>
                {uniqueTypes.map((type) => (
                    <label key={type} className='type-label'>
                        <input
                            type='checkbox'
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                        />
                        {type}
                    </label>
                ))}
            </div>

            <div className='stat-filter-container'>
                <div className='stat-filter'>
                    <label>Weight</label>
                    <OperatorSelect 
                        value={weightOperator}
                        onChange={(e) => {
                            setWeightOperator(e.target.value);
                            handleStatChange('weight', e.target.value, weightValue);
                        }}
                    />
                    <input
                        type='number'
                        min='0'
                        step='50'
                        value={weightValue}
                        onChange={(e) => {
                            setWeightValue(e.target.value);
                            handleStatChange('weight', weightOperator, e.target.value);
                        }}
                    />
                </div>

                <div className='stat-filter'>
                    <label>Height</label>
                    <OperatorSelect 
                        value={heightOperator}
                        onChange={(e) => {
                            setHeightOperator(e.target.value);
                            handleStatChange('height', e.target.value, heightValue);
                        }}
                    />
                    <input
                        type='number'
                        min='0'
                        step='50'
                        value={heightValue}
                        onChange={(e) => {
                            setHeightValue(e.target.value);
                            handleStatChange('height', heightOperator, e.target.value);
                        }}
                    />
                </div>

                <div className='stat-filter'>
                    <label>Base Stat</label>
                    <OperatorSelect 
                        value={weightOperator}
                        onChange={(e) => {
                            setBaseStatOperator(e.target.value);
                            handleStatChange('base_stat', e.target.value, baseStatValue);
                        }}
                    />
                    <input
                        type='number'
                        min='0'
                        step='50'
                        value={baseStatValue}
                        onChange={(e) => {
                            setBaseStatValue(e.target.value);
                            handleStatChange('base_stat', baseStatOperator, e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default FilterPanel;