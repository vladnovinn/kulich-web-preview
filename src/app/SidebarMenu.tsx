import { Cell, useSidebarLeft } from '../kit/components'
import type { MenuItem } from './menu'

type SidebarMenuProps = {
  items: MenuItem[]
  active: string
  onSelect: (id: string) => void
  servicesOpen?: boolean
}

export function SidebarMenu({ items, active, onSelect, servicesOpen = false }: SidebarMenuProps) {
  const sidebar = useSidebarLeft()
  const pinned = items.filter((item) => item.group === 'pinned')
  const favorites = items.filter((item) => item.group === 'favorite')

  const renderItem = (item: MenuItem) => (
    <span
      key={item.id}
      onPointerDown={(event) => {
        if (item.id === 'all' || servicesOpen) event.stopPropagation()
      }}
    >
      <Cell
        icon={item.icon}
        title={item.title}
        state={item.id === active ? 'selected' : 'normal'}
        chevron={item.chevron}
        onClick={() => {
          onSelect(item.id)
          sidebar?.collapseFlyout()
        }}
      />
    </span>
  )

  return (
    <>
      <div className="kit-nav-pinned">{pinned.map(renderItem)}</div>
      {favorites.length > 0 ? (
        <div className="kit-nav-favorites">{favorites.map(renderItem)}</div>
      ) : null}
    </>
  )
}
