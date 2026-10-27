import { useState } from 'react'
import { menuItems } from './menu'
import { SidebarMenu } from './SidebarMenu'

export type AppNavState = {
  active: string
  onSelect: (id: string) => void
  servicesOpen?: boolean
}

export function useAppNav(): AppNavState {
  const [active, setActive] = useState('home')

  return {
    active,
    onSelect: setActive,
  }
}

export function AppNav({ active, onSelect, servicesOpen = false }: AppNavState) {
  return (
    <SidebarMenu
      items={menuItems}
      active={active}
      onSelect={onSelect}
      servicesOpen={servicesOpen}
    />
  )
}
