import './Stepper.css'

export default function Stepper({ value, onChange }) {
  return (
    <div className="stepper">
      <button
        className="stepper-btn"
        onClick={() => onChange(Math.max(0, value - 1))}
        aria-label="감소"
      >
        −
      </button>
      <span className={`stepper-val${value > 0 ? ' active' : ''}`}>
        {value}
      </span>
      <button
        className="stepper-btn"
        onClick={() => onChange(value + 1)}
        aria-label="증가"
      >
        +
      </button>
    </div>
  )
}
