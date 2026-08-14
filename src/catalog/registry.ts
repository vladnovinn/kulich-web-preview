import type { CatalogEntry } from './types'
import { AvatarDemo } from '../demos/AvatarDemo'
import { BodyDemo } from '../demos/BodyDemo'
import { CellDemo } from '../demos/CellDemo'
import { CellStackDemo } from '../demos/CellStackDemo'
import { SearchInputDemo } from '../demos/SearchInputDemo'
import { SidebarLeftDemo } from '../demos/SidebarLeftDemo'
import { SidebarRightDemo } from '../demos/SidebarRightDemo'

export const catalog: CatalogEntry[] = [
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Content',
    description: 'Атом 40×40: иконка из каталога, состояния Normal, Hover и Selected.',
    status: 'draft',
    Demo: AvatarDemo,
  },
  {
    slug: 'cell',
    name: 'Cell',
    category: 'Content',
    description: 'Ячейка с аватаром и текстом. Состояния Selected, Selected Alt, Normal, Hover, Minimize и Skeleton.',
    status: 'draft',
    Demo: CellDemo,
  },
  {
    slug: 'cell-stack',
    name: 'CellStack',
    category: 'Content',
    description: 'Группа Cell без аватара. Skeleton задаётся на стеке, hover — у каждой ячейки отдельно.',
    status: 'draft',
    Demo: CellStackDemo,
  },
  {
    slug: 'search-input',
    name: 'Search Input',
    category: 'Inputs',
    description:
      'Поле поиска со слоем BG: сплошная подложка и блюр, чтобы контент при скролле уходил под поиск и не был виден.',
    status: 'draft',
    layout: 'fill',
    Demo: SearchInputDemo,
  },
  {
    slug: 'sidebar-left',
    name: 'Sidebar Left',
    category: 'Layout',
    description:
      'Левая панель: логотип, Cell и CellStack. Свёрнутая версия на ховере раскрывается в панель с меню. Skeleton — пока данные меню ещё не пришли.',
    status: 'draft',
    layout: 'fill',
    Demo: SidebarLeftDemo,
  },
  {
    slug: 'sidebar-right',
    name: 'Sidebar Right',
    category: 'Layout',
    description:
      'Правая панель: профиль, уведомления, документы и чат. Barbie — 88px, Full Size — 320px. Skeleton — пока данные ещё не пришли.',
    status: 'draft',
    layout: 'fill',
    Demo: SidebarRightDemo,
  },
  {
    slug: 'body',
    name: 'Body',
    category: 'Layout',
    description: 'Основная область экрана: заголовок и контент.',
    status: 'draft',
    layout: 'fill',
    Demo: BodyDemo,
  },
]

export function getCatalogEntry(slug: string): CatalogEntry | undefined {
  return catalog.find((entry) => entry.slug === slug)
}

export function groupCatalogByCategory(
  entries: CatalogEntry[],
): { category: string; items: CatalogEntry[] }[] {
  const groups = new Map<string, CatalogEntry[]>()

  for (const entry of entries) {
    const list = groups.get(entry.category) ?? []
    list.push(entry)
    groups.set(entry.category, list)
  }

  return [...groups.entries()].map(([category, items]) => ({
    category,
    items,
  }))
}
