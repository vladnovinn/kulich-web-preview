import type { IconId } from '../icons/registry'

export const MENU_BOOTSTRAP_DELAY_MS = 1200
export const MENU_SPLASH_DELAY_MS = 1000

export type MenuPriority = 'always' | 'medium'
export type MenuGroup = 'pinned' | 'favorite'

export type MenuItem = {
  id: string
  icon: IconId
  title: string
  priority: MenuPriority
  group: MenuGroup
  chevron?: 'right'
  wideContent?: boolean
}

export const menuItems: MenuItem[] = [
  { id: 'home', icon: 'home', title: 'Главная', priority: 'always', group: 'pinned' },
  { id: 'payments', icon: 'two-coins', title: 'Платежи', priority: 'always', group: 'pinned' },
  { id: 'statements', icon: 'doc', title: 'Выписки', priority: 'medium', group: 'pinned' },
  { id: 'tariffs', icon: 'tariffs', title: 'Тарифы', priority: 'medium', group: 'pinned' },
  { id: 'invoice', icon: 'doc-arrow-up', title: 'Выставление счета', priority: 'medium', group: 'pinned' },
  { id: 'all', icon: 'grid', title: 'Все сервисы', priority: 'always', group: 'pinned', chevron: 'right' },
  { id: 'favorite-1', icon: 'calendar-check', title: 'Бухгалтерия', priority: 'medium', group: 'favorite' },
  { id: 'favorite-2', icon: 'star', title: 'Избранный сервис 2', priority: 'medium', group: 'favorite' },
  { id: 'favorite-3', icon: 'star', title: 'Избранный сервис 3', priority: 'medium', group: 'favorite' },
  { id: 'favorite-4', icon: 'star', title: 'Избранный сервис 4', priority: 'medium', group: 'favorite' },
]

export function getMenuItem(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id)
}
