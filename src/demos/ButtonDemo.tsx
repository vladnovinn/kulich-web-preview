import {
  Button,
  type ButtonAppearance,
  type ButtonSize,
} from '../kit/components'

const appearances: { appearance: ButtonAppearance; label: string }[] = [
  { appearance: 'primary', label: 'Primary' },
  { appearance: 'accent', label: 'Accent' },
  { appearance: 'secondary', label: 'Secondary' },
  { appearance: 'flat', label: 'Flat' },
  { appearance: 'outline', label: 'Outline' },
  { appearance: 'floating', label: 'Floating' },
]

const sizes: { size: ButtonSize; label: string }[] = [
  { size: 'l', label: 'Large' },
  { size: 'm', label: 'Medium' },
  { size: 's', label: 'Small' },
  { size: 'xs', label: 'Extra small' },
]

export function ButtonDemo() {
  return (
    <div className="demo-stack demo-stack-wide">
      <p className="demo-caption">Appearance</p>
      <div className="demo-row">
        {appearances.map(({ appearance, label }) => (
          <Button key={appearance} appearance={appearance}>
            {label}
          </Button>
        ))}
        <Button disabled>Primary disabled</Button>
      </div>

      <p className="demo-caption">Sizes</p>
      <div className="demo-row">
        {sizes.map(({ size, label }) => (
          <Button key={size} size={size}>
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
