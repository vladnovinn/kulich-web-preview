import type { IconId } from '../icons/registry'

export const MENU_FETCH_DELAY_MS = 800
export const MENU_BOOTSTRAP_DELAY_MS = 1200
export const MENU_SPLASH_DELAY_MS = 1000

const submenu = [
  'Пункт меню 1',
  'Пункт меню 2',
  'Пункт меню 3',
  'Пункт меню 4',
  'Пункт меню 5',
  'Пункт меню 6',
  'Пункт меню 7',
  'Пункт меню 8',
]

export const SUBMENUS: Record<string, string[]> = {
  home: submenu,
  accounting: submenu,
}

export type MenuPriority = 'always' | 'medium'

export type MenuItem = {
  id: string
  icon: IconId
  title: string
  hasSubmenu?: boolean
  priority: MenuPriority
  wideContent?: boolean
}

export const menuItems: MenuItem[] = [
  { id: 'home', icon: 'home', title: 'Главная', hasSubmenu: true, priority: 'always' },
  { id: 'payments', icon: 'two-coins', title: 'Платежи', priority: 'always' },
  { id: 'accounting', icon: 'calendar-check', title: 'Бухгалтерия', hasSubmenu: true, priority: 'medium' },
  { id: 'acquiring', icon: 'pos-terminal', title: 'Торговый эквайринг', priority: 'medium' },
  { id: 'broker', icon: 'coin', title: 'Брокерский счет', priority: 'medium', wideContent: true },
  { id: 'payroll', icon: 'wallet', title: 'Зарплатный проект', priority: 'medium' },
  { id: 'all', icon: 'grid', title: 'Все сервисы', priority: 'always' },
]

export function getMenuItem(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id)
}
