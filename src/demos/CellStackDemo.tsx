import { Cell, CellStack } from '../kit/components'

const titles = [
  'Пункт меню 1',
  'Пункт меню 2',
  'Пункт меню 3',
  'Пункт меню 4',
  'Пункт меню 5',
  'Пункт меню 6',
  'Пункт меню 7',
  'Пункт меню 8',
]

export function CellStackDemo() {
  return (
    <div className="demo-stack demo-stack-wide">
      <p className="demo-caption">Skeleton=False</p>
      <CellStack>
        {titles.map((title, index) => (
          <Cell
            key={title}
            title={title}
            state={index === 0 ? 'hover' : 'normal'}
          />
        ))}
      </CellStack>

      <p className="demo-caption">Skeleton=True</p>
      <CellStack skeleton>
        {titles.map((title) => (
          <Cell key={title} title={title} />
        ))}
      </CellStack>
    </div>
  )
}
