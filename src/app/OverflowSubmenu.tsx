import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Cell,
  CellStack,
  Dropdown,
  DropdownItem,
  useSidebarLeft,
} from '../kit/components'
import { CELL_HEIGHT } from './useMenuOverflow'

const DROPDOWN_PADDING = 8
const DROPDOWN_ITEM_PADDING = 20
const FLYOUT_WIDTH = 272

type MenuPos = {
  left: number
  top?: number
  bottom?: number
}

type OverflowSubmenuProps = {
  items: string[]
  visibleCount?: number
  open: boolean
  subActive: string | null
  onSelect: (title: string) => void
}

export function OverflowSubmenu({
  items,
  visibleCount: visibleCountProp,
  open,
  subActive,
  onSelect,
}: OverflowSubmenuProps) {
  const stackRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const sidebar = useSidebarLeft()
  const [visibleCount, setVisibleCount] = useState(
    visibleCountProp ?? items.length,
  )
  const [moreOpen, setMoreOpen] = useState(false)
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null)

  useLayoutEffect(() => {
    if (visibleCountProp != null) {
      setVisibleCount(visibleCountProp)
      if (visibleCountProp >= items.length) {
        setMoreOpen((current) => (current ? false : current))
      }
    }
  }, [items.length, visibleCountProp])

  useEffect(() => {
    if (!open) setMoreOpen(false)
  }, [open])

  const setMenuHold = sidebar?.setMenuHold

  useEffect(() => {
    setMenuHold?.(moreOpen)
    return () => setMenuHold?.(false)
  }, [moreOpen, setMenuHold])

  useLayoutEffect(() => {
    if (!moreOpen || !moreRef.current) {
      setMenuPos(null)
      return
    }

    const box = moreRef.current.getBoundingClientRect()
    const hiddenCount = items.length - visibleCount

    if (sidebar?.minimize) {
      const nav = moreRef.current.closest('.kit-sidebar-nav')
      const navLeft = nav?.getBoundingClientRect().left ?? box.left
      setMenuPos({
        left: navLeft + FLYOUT_WIDTH,
        top:
          box.top -
          Math.max(0, hiddenCount - 1) * CELL_HEIGHT -
          DROPDOWN_PADDING,
      })
      return
    }

    const title = moreRef.current.querySelector('.kit-cell-title')
    const titleLeft =
      title?.getBoundingClientRect().left ?? box.left + DROPDOWN_ITEM_PADDING
    setMenuPos({
      left: titleLeft - DROPDOWN_PADDING - DROPDOWN_ITEM_PADDING,
      bottom: window.innerHeight - box.top,
    })
  }, [moreOpen, visibleCount, items.length, sidebar?.minimize])

  useEffect(() => {
    if (!moreOpen) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (moreRef.current?.contains(target)) return
      if (target.closest('.kit-dropdown')) return
      setMoreOpen(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [moreOpen])

  const visible = items.slice(0, visibleCount)
  const hidden = items.slice(visibleCount)

  return (
    <>
      <CellStack ref={stackRef} open={open}>
        {visible.map((title) => (
          <Cell
            key={title}
            title={title}
            state={title === subActive ? 'selected' : 'normal'}
            onClick={() => {
              onSelect(title)
              sidebar?.collapseFlyout()
            }}
          />
        ))}
        {hidden.length > 0 ? (
          <div ref={moreRef} onClick={(event) => event.stopPropagation()}>
            <Cell
              title="Показать еще"
              chevron={moreOpen ? 'up' : 'down'}
              state={moreOpen ? 'hover' : 'normal'}
              expanded={moreOpen}
              onClick={() => setMoreOpen((value) => !value)}
            />
          </div>
        ) : null}
      </CellStack>
      {moreOpen && menuPos && hidden.length > 0
        ? createPortal(
            <Dropdown
              style={{
                position: 'fixed',
                left: menuPos.left,
                top: menuPos.top,
                bottom: menuPos.bottom,
              }}
            >
              {hidden.map((title) => (
                <DropdownItem
                  key={title}
                  selected={title === subActive}
                  onClick={() => {
                    onSelect(title)
                    setMoreOpen(false)
                    sidebar?.collapseFlyout()
                  }}
                >
                  {title}
                </DropdownItem>
              ))}
            </Dropdown>,
            document.body,
          )
        : null}
    </>
  )
}
