import { Segmented, type SegmentedSize } from '../kit/components'

const items = [
  { value: 'all', label: 'All 3' },
  { value: 'incoming', label: 'Incoming' },
  {
    value: 'outgoing',
    label: 'Outgoing',
    menu: [
      { value: 'outgoing', label: 'Outgoing' },
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'This week' },
      { value: 'month', label: 'This month' },
    ],
  },
]

const sizes: SegmentedSize[] = ['l', 'm', 's']

export function SegmentedDemo() {
  return (
    <div className="demo-stack demo-stack-wide">
      <p className="demo-caption">Sizes</p>
      {sizes.map((size) => (
        <Segmented key={size} items={items} size={size} />
      ))}

      <p className="demo-caption">Full width</p>
      <Segmented
        items={[
          { value: 'dynamic', label: 'Dynamic width' },
          { value: 'items', label: 'Items' },
        ]}
        fullWidth
      />

      <p className="demo-caption">Disabled</p>
      <Segmented items={items} disabled />
    </div>
  )
}
