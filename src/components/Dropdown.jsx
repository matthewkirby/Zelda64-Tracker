export const Dropdown = ({ label, options, value, onChange, disabled }) => (
  <label>
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled ?? false}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);