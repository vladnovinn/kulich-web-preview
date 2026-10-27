import type { CatalogEntry } from './types'
import { AllServicesDemo } from '../demos/AllServicesDemo'
import { AvatarDemo } from '../demos/AvatarDemo'
import { BadgeDemo } from '../demos/BadgeDemo'
import { BodyDemo } from '../demos/BodyDemo'
import { ButtonDemo } from '../demos/ButtonDemo'
import { CardLargeDemo } from '../demos/CardLargeDemo'
import { CompanySheetDemo } from '../demos/CompanySheetDemo'
import { CellDemo } from '../demos/CellDemo'
import { HeaderDemo } from '../demos/HeaderDemo'
import { CellStackDemo } from '../demos/CellStackDemo'
import { SearchInputDemo } from '../demos/SearchInputDemo'
import { SegmentedDemo } from '../demos/SegmentedDemo'
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
    slug: 'badge',
    name: 'Badge',
    category: 'Content',
    description: 'Бейдж Accent 1 в размерах XL, L, M и S.',
    status: 'draft',
    Demo: BadgeDemo,
  },
  {
    slug: 'button',
    name: 'Button',
    category: 'Content',
    description:
      'Кнопки Primary, Accent, Secondary, Flat, Outline и Floating в размерах L, M, S и XS.',
    status: 'draft',
    Demo: ButtonDemo,
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
    slug: 'segmented',
    name: 'Segmented',
    category: 'Navigation',
    description:
      'Переключатель между разделами или состояниями в размерах L, M и S.',
    status: 'draft',
    Demo: SegmentedDemo,
  },
  {
    slug: 'sidebar-left',
    name: 'Sidebar Left',
    category: 'Layout',
    description:
      'Левая панель: логотип и пункты меню. Свёрнутая версия на ховере раскрывается в панель с меню. Skeleton — пока данные меню ещё не пришли.',
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
    slug: 'card-large',
    name: 'Card Large',
    category: 'Layout',
    description:
      'Большая карточка: базовая, аватар, один пункт, списки, футер, изображение, отступы и поповер.',
    status: 'draft',
    Demo: CardLargeDemo,
  },
  {
    slug: 'header',
    name: 'Header',
    category: 'Layout',
    description:
      'Заголовок секции в размерах H1–H6 и Body L, M, S. Размер бейджа и кнопки следует за размером заголовка.',
    status: 'draft',
    Demo: HeaderDemo,
  },
  {
    slug: 'company-sheet',
    name: 'Шторка компании',
    category: 'Layout',
    description:
      'Меню профиля и компаний: свёрнутая и раскрытая кнопка счёта и шторка со всеми состояниями личного кабинета.',
    status: 'draft',
    layout: 'fill',
    Demo: CompanySheetDemo,
  },
  {
    slug: 'all-services',
    name: 'Все сервисы',
    category: 'Layout',
    description:
      'Каталог сервисов в три колонки на широком экране и в две на узком. В каждой ячейке иконка Star.',
    status: 'draft',
    layout: 'fill',
    Demo: AllServicesDemo,
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
