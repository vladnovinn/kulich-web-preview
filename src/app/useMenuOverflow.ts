import { useLayoutEffect, useState } from 'react'
import { useSidebarLeft } from '../kit/components'
import { menuItems } from './menu'

export const CELL_HEIGHT = 56
export const NAV_GAP = 4
export const MIN_VISIBLE_L2 = 3
const FLYOUT_PADDING = 8
const PIN_MENU_GAP = 8

const alwaysCount = menuItems.filter((item) => item.priority === 'always').length
const mediumIds = menuItems
  .filter((item) => item.priority === 'medium')
  .map((item) => item.id)

function stackCells(visibleL2: number, totalL2: number, stackOpen: boolean) {
  if (!stackOpen || totalL2 <= 0) return 0
  return visibleL2 + (visibleL2 < totalL2 ? 1 : 0)
}

function menuHeight(l1Count: number, stackCellCount: number) {
  const parts = l1Count + (stackCellCount > 0 ? 1 : 0)
  if (parts === 0) return 0
  return l1Count * CELL_HEIGHT + stackCellCount * CELL_HEIGHT + (parts - 1) * NAV_GAP
}

export function computeMenuOverflow(options: {
  available: number
  keepId: string | null
  l2Total: number
  stackOpen: boolean
}) {
  const { available, keepId, l2Total, stackOpen } = options
  const hiddenL1 = new Set<string>()
  let visibleL2 = stackOpen ? l2Total : 0
  const minL2 =
    stackOpen && l2Total > MIN_VISIBLE_L2 ? MIN_VISIBLE_L2 : visibleL2

  const l1Count = () =>
    alwaysCount + mediumIds.filter((id) => !hiddenL1.has(id)).length

  const height = () =>
    menuHeight(l1Count(), stackCells(visibleL2, l2Total, stackOpen))

  for (let index = mediumIds.length - 1; index >= 0; index -= 1) {
    if (height() <= available) break
    const id = mediumIds[index]
    if (id === keepId) continue
    hiddenL1.add(id)
  }

  while (visibleL2 > minL2 && height() > available) {
    visibleL2 -= 1
  }

  return { visibleL2, hiddenL1 }
}

export function useMenuOverflow(options: {
  activeId: string
  openStackId: string | null
  l2Total: number
}) {
  const { activeId, openStackId, l2Total } = options
  const sidebar = useSidebarLeft()
  const [hiddenL1, setHiddenL1] = useState<Set<string>>(() => new Set())
  const [visibleL2, setVisibleL2] = useState(l2Total)

  useLayoutEffect(() => {
    const panel = sidebar?.rootRef.current
    if (!(panel instanceof HTMLElement)) return

    const measure = () => {
      const nav = panel.querySelector('.kit-sidebar-nav')
      if (!(nav instanceof HTMLElement)) return

      const menuBtn = panel.querySelector('.kit-sidebar-menu-btn')
      const available =
        sidebar?.minimize && menuBtn instanceof HTMLElement
          ? Math.max(
              0,
              menuBtn.getBoundingClientRect().top -
                nav.getBoundingClientRect().top -
                FLYOUT_PADDING -
                PIN_MENU_GAP,
            )
          : nav.clientHeight
      const keepId = mediumIds.includes(activeId) ? activeId : null
      const next = computeMenuOverflow({
        available,
        keepId,
        l2Total,
        stackOpen: Boolean(openStackId) && l2Total > 0,
      })

      setVisibleL2((current) =>
        current === next.visibleL2 ? current : next.visibleL2,
      )
      setHiddenL1((current) => {
        if (
          current.size === next.hiddenL1.size &&
          [...next.hiddenL1].every((id) => current.has(id))
        ) {
          return current
        }
        return next.hiddenL1
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(panel)
    const nav = panel.querySelector('.kit-sidebar-nav')
    if (nav instanceof HTMLElement) observer.observe(nav)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [activeId, l2Total, openStackId, sidebar?.minimize, sidebar?.rootRef])

  return { hiddenL1, visibleL2 }
}
