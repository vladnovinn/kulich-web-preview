import { useEffect, useRef, useState } from 'react'
import { IconSvg } from '../icons/inline'
import { AllServices } from '../kit/AllServices'
import { Badge, Button, Header, SearchBackdrop, SearchInput, Segmented, SidebarLeft, SidebarRight, SidebarRightChat, SidebarRightToolbar, headerButtonSize } from '../kit/components'
import { AppNav, useAppNav } from './AppNav'
import { MENU_BOOTSTRAP_DELAY_MS, MENU_SPLASH_DELAY_MS, getMenuItem } from './menu'
import './app.css'

const CONTENT_COLUMN_WIDTH = 1168
const LEFT_SIDEBAR_MIN = 256
const RIGHT_SIDEBAR_MIN = 284
const MINIMIZED_SIDEBAR = 88
const COLLAPSE_LEFT = `(max-width: ${LEFT_SIDEBAR_MIN + CONTENT_COLUMN_WIDTH + MINIMIZED_SIDEBAR - 1}px)`
const COLLAPSE_RIGHT = `(max-width: ${CONTENT_COLUMN_WIDTH + RIGHT_SIDEBAR_MIN * 2 - 1}px)`
const COMPACT_RIGHT = '(max-width: 1063px), (min-width: 1280px) and (max-width: 1344px)'
const CONTENT_BLOCKS = 12
const pageHeaderIds = new Set([
  'home',
  'payments',
  'statements',
  'tariffs',
  'invoice',
  'favorite-2',
  'favorite-3',
  'favorite-4',
])
const FAVORITE_TOOLBAR_DELAY_MS = 1500
const accountingSegments = [
  { value: 'home', label: 'Главная' },
  { value: 'tax-calendar', label: 'Налоговый календарь' },
  { value: 'edo', label: 'ЭДО' },
  { value: 'operations', label: 'Операции' },
  { value: 'settings', label: 'Настройки' },
  { value: 'tariffs', label: 'Тарифы', badge: <Badge size="m">Новое</Badge> },
]

const accountingViews: Record<string, { title: string; subtitle?: string }> = {
  home: { title: 'Бухгалтерия', subtitle: 'УСН «Доходы» 6%' },
  'tax-calendar': { title: 'Налоговый календарь', subtitle: 'Ближайшие платежи и отчёты' },
  edo: { title: 'ЭДО', subtitle: 'Входящие и исходящие документы' },
  operations: { title: 'Операции', subtitle: 'Движение по счетам' },
  settings: { title: 'Настройки', subtitle: 'Параметры учёта' },
  tariffs: { title: 'Тарифы', subtitle: 'Подписка на бухгалтерию' },
}
const favoriteSearchSegments = Array.from({ length: 10 }, (_, index) => ({
  value: `item-${index + 1}`,
  label: `Пункт меню ${index + 1}`,
}))

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

function AppLoader() {
  return <IconSvg name="loader" className="app-loader" />
}

function ContentCards({ tall = true }: { tall?: boolean }) {
  return (
    <>
      {Array.from({ length: CONTENT_BLOCKS }, (_, index) => (
        <div key={index} className={`app-main-block${tall ? ' is-tall' : ''}`} />
      ))}
    </>
  )
}

function AccountingContent({ segment }: { segment: string }) {
  const view = accountingViews[segment] ?? accountingViews.home

  return (
    <>
      <Header
        size="h3"
        title={view.title}
        subtitle={view.subtitle}
        accessories={
          <Button appearance="primary" size={headerButtonSize('h3')}>
            Действие
          </Button>
        }
      />
      <ContentCards />
    </>
  )
}

export function AppPage() {
  const [phase, setPhase] = useState<'splash' | 'skeleton' | 'ready'>('splash')
  const collapseLeft = useMediaQuery(COLLAPSE_LEFT)
  const collapseRight = useMediaQuery(COLLAPSE_RIGHT)
  const compactRight = useMediaQuery(COMPACT_RIGHT)
  const nav = useAppNav()
  const [servicesPhase, setServicesPhase] = useState<'closed' | 'open' | 'closing'>('closed')
  const servicesPanelRef = useRef<HTMLDivElement>(null)
  const servicesOpenRef = useRef(false)
  servicesOpenRef.current = servicesPhase === 'open'
  const onSelect = (id: string) => {
    if (id === 'all') {
      setServicesPhase((phase) => (phase === 'open' ? 'closing' : phase === 'closed' ? 'open' : phase))
      return
    }
    if (servicesOpenRef.current) {
      setServicesPhase('closing')
    }
    nav.onSelect(id)
  }
  const item = getMenuItem(nav.active)
  const routeKey = nav.active
  const [loadedRoute, setLoadedRoute] = useState(routeKey)
  const loadedItem = getMenuItem(loadedRoute)
  const title = item?.title ?? ''
  const collapsedSearch = routeKey !== 'home'
  const hasSearchSegments = item?.group === 'favorite' && item.id !== 'favorite-4'
  const [accountingSegment, setAccountingSegment] = useState('home')
  const [readySearchRoute, setReadySearchRoute] = useState<string | null>(routeKey)
  const toolbarRouteRef = useRef(routeKey)
  if (toolbarRouteRef.current !== routeKey) {
    toolbarRouteRef.current = routeKey
    if (readySearchRoute !== null) setReadySearchRoute(null)
    if (accountingSegment !== 'home') setAccountingSegment('home')
  }
  const ready = phase === 'ready'
  const searchReady = readySearchRoute === routeKey
  const contentReady = loadedRoute === routeKey
  const showContentLoader = phase === 'skeleton' || (ready && !contentReady)
  const targetIsWide = Boolean(item?.wideContent)
  const loadedIsWide = Boolean(loadedItem?.wideContent)
  const isWideLayout = showContentLoader ? loadedIsWide : targetIsWide
  const minimizeLeft = collapseLeft || isWideLayout
  const minimizeRight = collapseRight || isWideLayout
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

  useEffect(() => {
    if (!ready || readySearchRoute === routeKey) return
    const timeoutId = window.setTimeout(() => setReadySearchRoute(routeKey), FAVORITE_TOOLBAR_DELAY_MS)
    return () => window.clearTimeout(timeoutId)
  }, [ready, readySearchRoute, routeKey])

  useEffect(() => {
    if (servicesPhase !== 'closing') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeoutId = window.setTimeout(() => setServicesPhase('closed'), reduce ? 0 : 450)
    return () => window.clearTimeout(timeoutId)
  }, [servicesPhase])

  useEffect(() => {
    if (servicesPhase !== 'open') return
    const onOutsideClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (servicesPanelRef.current?.contains(target)) return
      if (target instanceof Element && target.closest('[data-sidebar-menu-item]')) return
      event.preventDefault()
      event.stopPropagation()
      setServicesPhase('closing')
    }
    document.addEventListener('click', onOutsideClick, true)
    return () => document.removeEventListener('click', onOutsideClick, true)
  }, [servicesPhase])

  if (phase === 'splash') {
    return (
      <div className="app-frame is-splash" aria-busy="true" aria-label="Загрузка">
        <AppLoader />
      </div>
    )
  }

  return (
    <div
      className={`app-frame${isWideLayout ? ' is-wide-content' : ''}${compactRight ? ' is-right-compact' : ''}${servicesPhase === 'open' ? ' is-services-open' : ''}`}
      data-page={routeKey}
      aria-busy={showContentLoader || undefined}
    >
      <SidebarLeft minimize={minimizeLeft} skeleton={!ready}>
        <AppNav active={nav.active} onSelect={onSelect} servicesOpen={servicesPhase === 'open'} />
      </SidebarLeft>
      <main className={`app-main${servicesPhase === 'open' ? ' is-services-open' : ''}`}>
        <div className={`app-main-search${searchReady && collapsedSearch ? ' has-search-button' : ''}${servicesPhase === 'open' ? ' has-services-back' : ''}`}>
          {servicesPhase === 'open' ? (
            <div className="kit-search is-collapsed app-services-back">
              <Button
                appearance="floating"
                className="kit-search-button"
                aria-label="Закрыть все сервисы"
                onClick={() => setServicesPhase('closing')}
              >
                <IconSvg name="chevron-left" className="kit-search-icon" />
              </Button>
            </div>
          ) : null}
          {!searchReady ? (
            <div className="kit-skeleton app-wide-search-skeleton" role="status" aria-label="Загрузка" />
          ) : collapsedSearch ? (
            <div className={`app-search-cluster${hasSearchSegments ? '' : ' is-button-only'}`}>
              <SearchBackdrop />
              {hasSearchSegments ? <>
              <div className="app-search-balance" aria-hidden="true">
                <SearchInput collapsed />
              </div>
              <Segmented
                key={routeKey}
                items={item?.id === 'favorite-1' ? accountingSegments : favoriteSearchSegments}
                size="l"
                value={item?.id === 'favorite-1' ? accountingSegment : undefined}
                onChange={item?.id === 'favorite-1' ? setAccountingSegment : undefined}
                collapseOverflow
              />
              </> : null}
              <SearchInput collapsed />
            </div>
          ) : (
            <SearchInput />
          )}
          {compactRight ? <SidebarRightToolbar skeleton={!ready} dismissSignal={routeKey} /> : null}
        </div>
        <div className="app-main-body">
          <div className="app-main-motion">
            <div className="app-main-scroll">
              <div className="app-main-container">
                {showContentLoader ? (
                  <div className="app-main-loader">
                    <AppLoader />
                  </div>
                ) : (
                  <div className="app-main-content">
                    {item?.id === 'favorite-1' ? (
                      <AccountingContent segment={accountingSegment} />
                    ) : (
                      <>
                        {pageHeaderIds.has(item?.id ?? '') ? (
                          <Header size="h3" title={title} />
                        ) : title ? (
                          <h1 className="app-main-title">{title}</h1>
                        ) : null}
                        <ContentCards tall={pageHeaderIds.has(item?.id ?? '')} />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {servicesPhase !== 'closed' ? (
            <div
              className={`app-services-layer${servicesPhase === 'closing' ? ' is-closing' : ''}`}
            >
              <div
                ref={servicesPanelRef}
                className="app-services-panel"
                role="dialog"
                aria-label="Все сервисы"
                onPointerDown={(event) => event.stopPropagation()}
              >
                <AllServices />
              </div>
            </div>
          ) : null}
        </div>
        {compactRight ? <SidebarRightChat skeleton={!ready} /> : null}
      </main>
      {compactRight ? null : (
        <SidebarRight
          minimize={minimizeRight}
          skeleton={!ready}
          dismissSignal={`${routeKey}:${minimizeRight}`}
        />
      )}
    </div>
  )
}
