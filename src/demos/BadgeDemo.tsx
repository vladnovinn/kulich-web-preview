import { Badge, type BadgeSize } from '../kit/components'

const sizes: BadgeSize[] = ['xl', 'l', 'm', 's']

export function BadgeDemo() {
  return (
    <div className="demo-stack">
      <p className="demo-caption">Sizes</p>
      <div className="demo-row">
        {sizes.map((size) => (
          <Badge key={size} size={size}>
            Badge
          </Badge>
        ))}
      </div>
    </div>
  )
}
