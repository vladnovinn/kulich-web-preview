import { useEffect, useRef, useState } from 'react'
import { SearchInput, SidebarLeft, SidebarRight } from '../kit/components'
import { AppNav, useAppNav } from './AppNav'
import { MENU_BOOTSTRAP_DELAY_MS, MENU_SPLASH_DELAY_MS, getMenuItem } from './menu'
import './app.css'

const CONTENT_COLUMN_WIDTH = 1168
const SIDEBAR_MIN_WIDTH = 284
const COMPACT_SIDEBAR = `(max-width: ${CONTENT_COLUMN_WIDTH + SIDEBAR_MIN_WIDTH * 2 - 1}px)`
const CONTENT_BLOCKS = 12

function useCompactSidebar() {
  const [compact, setCompact] = useState(
    () => window.matchMedia(COMPACT_SIDEBAR).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(COMPACT_SIDEBAR)
    const onChange = () => setCompact(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return compact
}

function AppLoader() {
  return <span className="app-loader" aria-hidden />
}

export function AppPage() {
  const [phase, setPhase] = useState<'splash' | 'skeleton' | 'ready'>('splash')
  const compact = useCompactSidebar()
  const nav = useAppNav()
  const item = getMenuItem(nav.active)
  const routeKey = `${nav.active}:${nav.subActive ?? ''}`
  const [loadedRoute, setLoadedRoute] = useState(routeKey)
  const loadedItem = getMenuItem(loadedRoute.split(':')[0])
  const title = nav.subActive ?? item?.title ?? ''
  const ready = phase === 'ready'
  const contentReady = loadedRoute === routeKey
  const showContentLoader = phase === 'skeleton' || (ready && !contentReady)
  const targetIsWide = Boolean(item?.wideContent)
  const loadedIsWide = Boolean(loadedItem?.wideContent)
  const isWideLayout = showContentLoader ? loadedIsWide : targetIsWide
  const minimizeSidebars = showContentLoader
    ? targetIsWide
      ? false
      : compact || loadedIsWide
    : compact || targetIsWide
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useEffect(() => {
    document.title = 'Т-Банк Бизнес'
    const timeoutId = window.setTimeout(() => setPhase('skeleton'), MENU_SPLASH_DELAY_MS)
    return () => {
      document.title = 'Kulich — Component preview'
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'skeleton') return
    const timeoutId = window.setTimeout(() => setPhase('ready'), MENU_BOOTSTRAP_DELAY_MS)
    return () => window.clearTimeout(timeoutId)
  }, [phase])

  useEffect(() => {
    if (phaseRef.current !== 'ready') return
    if (loadedRoute === routeKey) return
    const timeoutId = window.setTimeout(() => setLoadedRoute(routeKey), MENU_BOOTSTRAP_DELAY_MS)
    return () => window.clearTimeout(timeoutId)
  }, [routeKey, loadedRoute])

  if (phase === 'splash') {
    return (
      <div className="app-frame is-splash" aria-busy="true" aria-label="Загрузка">
        <AppLoader />
      </div>
    )
  }

  return (
    <div
      className={`app-frame${isWideLayout ? ' is-wide-content' : ''}`}
      aria-busy={showContentLoader || undefined}
    >
      <SidebarLeft minimize={minimizeSidebars} skeleton={!ready}>
        <AppNav {...nav} />
      </SidebarLeft>
      <main className="app-main">
        <div className="app-main-search">
          <SearchInput />
        </div>
        <div className="app-main-scroll">
          <div className="app-main-container">
            {showContentLoader ? (
              <div className="app-main-loader">
                <AppLoader />
              </div>
            ) : (
              <div className="app-main-content">
                {title ? <h1 className="app-main-title">{title}</h1> : null}
                {targetIsWide ? (
                  <div className="app-main-table" />
                ) : (
                  Array.from({ length: CONTENT_BLOCKS }, (_, index) => (
                    <div key={index} className="app-main-block" />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <SidebarRight minimize={minimizeSidebars} skeleton={!ready} />
    </div>
  )
}
