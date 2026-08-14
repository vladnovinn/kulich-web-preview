import { Fragment, useEffect, useState } from 'react'
import { Cell, useSidebarLeft } from '../kit/components'
import { OverflowSubmenu } from './OverflowSubmenu'
import {
  MENU_FETCH_DELAY_MS,
  SUBMENUS,
  getMenuItem,
  menuItems,
} from './menu'
import { useMenuOverflow } from './useMenuOverflow'

export type AppNavState = {
  active: string
  subActive: string | null
  loadingId: string | null
  openStackId: string | null
  submenus: Record<string, string[]>
  onSelect: (id: string) => void
  onSelectSub: (title: string) => void
}

export function useAppNav(): AppNavState {
  const [active, setActive] = useState('home')
  const [subActive, setSubActive] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [openStackId, setOpenStackId] = useState<string | null>(null)
  const [submenus, setSubmenus] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const item = getMenuItem(active)
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
    }, MENU_FETCH_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [active])

  return {
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
}

export function AppNav({
  active,
  subActive,
  loadingId,
  openStackId,
  submenus,
  onSelect,
  onSelectSub,
}: AppNavState) {
  const sidebar = useSidebarLeft()
  const openChildren = openStackId ? (submenus[openStackId] ?? []) : []
  const { hiddenL1, visibleL2 } = useMenuOverflow({
    activeId: active,
    openStackId,
    l2Total: openChildren.length,
  })

  return (
    <>
      {menuItems.map((item) => {
        if (hiddenL1.has(item.id)) return null

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
              <OverflowSubmenu
                items={children}
                visibleCount={
                  openStackId === item.id ? visibleL2 : children.length
                }
                open={openStackId === item.id}
                subActive={selected ? subActive : null}
                onSelect={onSelectSub}
              />
            ) : null}
          </Fragment>
        )
      })}
    </>
  )
}
