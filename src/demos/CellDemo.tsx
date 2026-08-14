import { Cell, type CellState } from '../kit/components'

const states: { state: CellState; label: string }[] = [
  { state: 'selected', label: 'Selected' },
  { state: 'selected-alt', label: 'Selected Alt' },
  { state: 'normal', label: 'Normal' },
  { state: 'hover', label: 'Hover' },
]

export function CellDemo() {
  return (
    <div className="demo-stack demo-stack-wide">
      <p className="demo-caption">State × Minimize</p>
      <div className="demo-cell-grid">
        {states.map((row) => (
          <div key={row.state} className="demo-cell-row">
            <Cell state={row.state} title="Главная" icon="home" />
            <Cell state={row.state} title="Главная" icon="home" minimize />
          </div>
        ))}
        <div className="demo-cell-row">
          <Cell skeleton />
          <Cell skeleton minimize />
        </div>
      </div>
    </div>
  )
}
