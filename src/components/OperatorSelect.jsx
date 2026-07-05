function OperatorSelect({ value, onChange }) {
    return (
        <select value={value} onChange={onChange}>
            <option value='gt'>&gt;</option>
            <option value='gt'>&gt;=</option>
            <option value='gt'>&lt;</option>
            <option value='gt'>&lt;=</option>
            <option value='gt'>=</option>
        </select>
    )
}

export default OperatorSelect;