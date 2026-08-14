import { Fragment, useEffect, useState } from 'react'
import { Cell, CellStack, SidebarLeft, useSidebarLeft } from '../kit/components'
import type { IconId } from '../icons/registry'

const FETCH_DELAY_MS = 800

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

const SUBMENUS: Record<string, string[]> = {
  home: submenu,
  accounting: submenu,
}

const items: {
  id: string
  icon: IconId
  title: string
  hasSubmenu?: boolean
}[] = [
  { id: 'home', icon: 'home', title: 'Главная', hasSubmenu: true },
  { id: 'payments', icon: 'two-coins', title: 'Платежи' },
  { id: 'accounting', icon: 'calendar-check', title: 'Бухгалтерия', hasSubmenu: true },
  { id: 'acquiring', icon: 'pos-terminal', title: 'Торговый эквайринг' },
  { id: 'broker', icon: 'coin', title: 'Брокерский счет' },
  { id: 'payroll', icon: 'wallet', title: 'Зарплатный проект' },
  { id: 'all', icon: 'grid', title: 'Все сервисы' },
]

type NavProps = {
  active: string
  subActive: string | null
  loadingId: string | null
  openStackId: string | null
  submenus: Record<string, string[]>
  onSelect: (id: string) => void
  onSelectSub: (title: string) => void
}

function SidebarNav({
  active,
  subActive,
  loadingId,
  openStackId,
  submenus,
  onSelect,
  onSelectSub,
}: NavProps) {
  const sidebar = useSidebarLeft()

  return (
    <>
      {items.map((item) => {
        const selected = item.id === active
        const children = submenus[item.id]

        return (
          <Fragment key={item.id}>
            <Cell
              icon={item.icon}
              title={item.title}
              state={
                selected
                  ? subActive
                    ? 'selected-alt'
                    : 'selected'
                  : 'normal'
              }
              loading={loadingId === item.id}
              onClick={() => {
                onSelect(item.id)
                if (!item.hasSubmenu) sidebar?.collapseFlyout()
              }}
            />
            {children ? (
              <CellStack open={openStackId === item.id}>
                {children.map((title) => (
                  <Cell
                    key={title}
                    title={title}
                    state={
                      selected && title === subActive ? 'selected' : 'normal'
                    }
                    onClick={() => onSelectSub(title)}
                  />
                ))}
              </CellStack>
            ) : null}
          </Fragment>
        )
      })}
    </>
  )
}

export function SidebarLeftDemo() {
  const [active, setActive] = useState('home')
  const [subActive, setSubActive] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [openStackId, setOpenStackId] = useState<string | null>(null)
  const [submenus, setSubmenus] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const item = items.find((entry) => entry.id === active)
    if (!item?.hasSubmenu) {
      setLoadingId(null)
      setOpenStackId(null)
      return
    }

    let cancelled = false
    setLoadingId(item.id)
    setOpenStackId(null)

    const timeoutId = window.setTimeout(() => {
      if (cancelled) return
      setSubmenus((prev) => ({ ...prev, [item.id]: SUBMENUS[item.id] ?? [] }))
      setLoadingId(null)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setOpenStackId(item.id)
        })
      })
    }, FETCH_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [active])

  const navProps: NavProps = {
    active,
    subActive,
    loadingId,
    openStackId,
    submenus,
    onSelect: (id: string) => {
      setActive(id)
      setSubActive(null)
    },
    onSelectSub: setSubActive,
  }

  return (
    <div className="demo-sidebars-page">
      <div>
        <p className="demo-caption">Skeleton=False</p>
        <div className="demo-sidebars">
          <SidebarLeft>
            <SidebarNav {...navProps} />
          </SidebarLeft>
          <div className="demo-sidebar-rail">
            <SidebarLeft minimize>
              <SidebarNav {...navProps} />
            </SidebarLeft>
          </div>
        </div>
      </div>
      <div>
        <p className="demo-caption">Skeleton=True</p>
        <div className="demo-sidebars">
          <SidebarLeft skeleton />
          <div className="demo-sidebar-rail">
            <SidebarLeft minimize skeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
