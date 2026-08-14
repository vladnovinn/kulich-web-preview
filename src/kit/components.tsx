import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { getIcon, type IconId } from '../icons/registry'
import { asset } from '../paths'

export type AvatarState = 'normal' | 'hover' | 'selected'

type AvatarProps = {
  state?: AvatarState
  icon?: IconId
}

export function Avatar({ state = 'normal', icon = 'home' }: AvatarProps) {
  const src = getIcon(icon)?.src ?? getIcon('home')?.src ?? ''

  return (
    <span className={`kit-avatar kit-avatar-${state}`}>
      <span className="kit-avatar-icon">
        <span
          className="kit-avatar-glyph"
          style={{
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
          }}
        />
      </span>
    </span>
  )
}

export type CellState = 'normal' | 'hover' | 'selected' | 'selected-alt'

type CellStackContextValue = {
  skeleton: boolean
  hideAvatar: true
}

const CellStackContext = createContext<CellStackContextValue | null>(null)

type SidebarLeftContextValue = {
  minimize: boolean
  setMenuHold: (hold: boolean) => void
  collapseFlyout: () => void
  rootRef: RefObject<HTMLElement | null>
}

const SidebarLeftContext = createContext<SidebarLeftContextValue | null>(null)

export function useSidebarLeft() {
  return useContext(SidebarLeftContext)
}

type CellStackProps = {
  children: ReactNode
  skeleton?: boolean
  open?: boolean
}

export const CellStack = forwardRef<HTMLDivElement, CellStackProps>(
  function CellStack(
    { children, skeleton = false, open = true },
    ref,
  ) {
    return (
      <CellStackContext.Provider value={{ skeleton, hideAvatar: true }}>
        <div
          ref={ref}
          className={`kit-cell-stack${skeleton ? ' is-skeleton' : ''}${open ? ' is-open' : ''}`}
          aria-hidden={open ? undefined : true}
        >
          <div className="kit-cell-stack-body">{children}</div>
        </div>
      </CellStackContext.Provider>
    )
  },
)

type CellProps = {
  title?: string
  icon?: IconId
  state?: CellState
  minimize?: boolean
  skeleton?: boolean
  loading?: boolean
  chevron?: 'up' | 'down'
  expanded?: boolean
  onClick?: () => void
}

function avatarStateForCell(state: CellState): AvatarState {
  if (state === 'selected' || state === 'selected-alt') return 'selected'
  return state
}

export function Cell({
  title = '',
  icon = 'home',
  state: stateProp = 'normal',
  minimize: minimizeProp = false,
  skeleton: skeletonProp = false,
  loading = false,
  chevron,
  expanded,
  onClick,
}: CellProps) {
  const stack = useContext(CellStackContext)
  const sidebar = useContext(SidebarLeftContext)
  const hideAvatar = stack?.hideAvatar ?? false
  const skeleton = stack?.skeleton || skeletonProp
  const minimize = sidebar ? false : minimizeProp
  const state = stateProp

  const className = `kit-cell${skeleton ? ' kit-cell-skeleton' : ` kit-cell-${state}`}${minimize ? ' is-minimize' : ''}${hideAvatar ? ' is-no-avatar' : ''}${loading ? ' is-loading' : ''}`

  const showCopy = !minimize
  const accessory = loading ? (
    <span className="kit-cell-accessory">
      <span className="kit-cell-loader" aria-hidden />
    </span>
  ) : chevron ? (
    <span className="kit-cell-accessory is-chevron">
      <span className={`kit-cell-chevron is-${chevron}`} aria-hidden />
    </span>
  ) : null
  const content = skeleton ? (
    <>
      {hideAvatar ? null : (
        <span className="kit-cell-avatar">
          <span className="kit-skeleton kit-skeleton-avatar" />
        </span>
      )}
      {showCopy ? (
        <span className="kit-cell-copy">
          <span className="kit-skeleton-text">
            <span className="kit-skeleton kit-skeleton-bar" />
          </span>
        </span>
      ) : null}
    </>
  ) : (
    <>
      {hideAvatar ? null : (
        <span className="kit-cell-avatar">
          <Avatar state={avatarStateForCell(state)} icon={icon} />
        </span>
      )}
      {showCopy ? (
        <span className="kit-cell-copy">
          <span className="kit-cell-title">{title}</span>
        </span>
      ) : null}
      {accessory}
    </>
  )

  if (onClick && !skeleton) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        aria-busy={loading || undefined}
        aria-expanded={expanded}
      >
        {content}
      </button>
    )
  }

  return (
    <div
      className={className}
      aria-busy={skeleton || loading || undefined}
      aria-label={skeleton ? 'Загрузка' : undefined}
    >
      {content}
    </div>
  )
}

type SearchInputProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function SearchInput({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Поиск',
  disabled,
}: SearchInputProps) {
  const isControlled = value !== undefined

  return (
    <div className={`kit-search${disabled ? ' is-disabled' : ''}`}>
      <div className="kit-search-bg" aria-hidden>
        <span className="kit-search-bg-solid" />
        <span className="kit-search-bg-blur">
          <span />
          <span />
          <span />
          <span />
        </span>
      </div>
      <label className="kit-search-field">
        <span className="visually-hidden">{placeholder}</span>
        <span className="kit-search-icon" aria-hidden />
        {isControlled ? (
          <input
            type="search"
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(event) => onChange?.(event.target.value)}
          />
        ) : (
          <input
            type="search"
            defaultValue={defaultValue}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(event) => onChange?.(event.target.value)}
          />
        )}
      </label>
    </div>
  )
}

type SidebarLeftProps = {
  children?: ReactNode
  minimize?: boolean
  skeleton?: boolean
  onMenuClick?: () => void
}

function SidebarBrand({ minimize }: { minimize: boolean }) {
  return (
    <div className="kit-sidebar-logo">
      <div className="kit-sidebar-brand">
        <span className="kit-sidebar-brand-inner">
          <img
            className="kit-sidebar-mark"
            src={asset('brand/mark.svg')}
            alt=""
            width={24}
            height={24}
          />
          {minimize ? null : (
            <img
              className="kit-sidebar-wordmark"
              src={asset('brand/wordmark.svg')}
              alt=""
              width={73}
              height={10}
            />
          )}
        </span>
        <span className="visually-hidden">Т-Банк Бизнес</span>
      </div>
    </div>
  )
}

const SIDEBAR_SKELETON_COUNT = 7

function SidebarNavSkeleton() {
  return (
    <>
      {Array.from({ length: SIDEBAR_SKELETON_COUNT }, (_, index) => (
        <Cell key={index} skeleton />
      ))}
    </>
  )
}

export function SidebarLeft({
  children,
  minimize = false,
  skeleton = false,
  onMenuClick,
}: SidebarLeftProps) {
  const rootRef = useRef<HTMLElement>(null)
  const [pinned, setPinned] = useState(false)
  const [hoverLocked, setHoverLocked] = useState(false)
  const [menuHold, setMenuHoldState] = useState(false)
  const setMenuHold = useCallback((hold: boolean) => {
    setMenuHoldState(hold)
  }, [])

  useEffect(() => {
    if (!minimize) {
      setPinned(false)
      setHoverLocked(false)
    }
  }, [minimize])

  useEffect(() => {
    if (!minimize || !pinned || skeleton) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (rootRef.current?.contains(target)) return
      if (target instanceof Element && target.closest('.kit-dropdown')) return
      setPinned(false)
      const active = document.activeElement
      if (active instanceof HTMLElement && rootRef.current?.contains(active)) {
        active.blur()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [minimize, pinned, skeleton])

  const collapseFlyout = useCallback(() => {
    setPinned(false)
    setMenuHoldState(false)
    setHoverLocked(true)
    const active = document.activeElement
    if (active instanceof HTMLElement && rootRef.current?.contains(active)) {
      active.blur()
    }
  }, [])

  const handleMenuClick = () => {
    if (skeleton) {
      onMenuClick?.()
      return
    }
    if (pinned) collapseFlyout()
    else {
      setPinned(true)
      setHoverLocked(false)
    }
    onMenuClick?.()
  }

  const handleNavClick = (event: MouseEvent<HTMLElement>) => {
    if (!minimize || skeleton) return
    if (!(event.target instanceof Element)) return
    const cell = event.target.closest('.kit-cell')
    if (!(cell instanceof HTMLElement)) return
    if (cell.querySelector('.kit-cell-chevron')) return
    if (cell.classList.contains('is-no-avatar')) {
      collapseFlyout()
      return
    }
    if (pinned) setPinned(false)
  }

  const className = [
    'kit-sidebar-left',
    minimize ? 'is-minimize' : '',
    pinned ? 'is-pinned' : '',
    menuHold ? 'is-hold-open' : '',
    hoverLocked ? 'is-hover-locked' : '',
    skeleton ? 'is-skeleton' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <SidebarLeftContext.Provider
      value={{ minimize, setMenuHold, collapseFlyout, rootRef }}
    >
      <aside
        ref={rootRef}
        className={className}
        aria-busy={skeleton || undefined}
        onMouseLeave={() => setHoverLocked(false)}
      >
        <SidebarBrand minimize={minimize} />
        <div className="kit-sidebar-content">
          <nav
            className="kit-sidebar-nav"
            aria-label="Основное меню"
            onClick={handleNavClick}
          >
            <div className="kit-sidebar-nav-clip">
              {skeleton ? <SidebarNavSkeleton /> : children}
            </div>
          </nav>
          {minimize ? (
            <button
              type="button"
              className={`kit-sidebar-menu-btn${pinned ? ' is-selected' : ''}`}
              aria-label={pinned ? 'Закрыть меню' : 'Меню'}
              aria-pressed={pinned}
              onClick={handleMenuClick}
            >
              <span className="kit-sidebar-menu-icon" aria-hidden />
            </button>
          ) : null}
        </div>
      </aside>
    </SidebarLeftContext.Provider>
  )
}

function SidebarRightGlyph({ icon }: { icon: IconId }) {
  const src = getIcon(icon)?.src ?? ''

  return (
    <span
      className="kit-sidebar-right-glyph"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
      }}
    />
  )
}

type SidebarRightActionProps = {
  icon: IconId
  label: string
  badge?: boolean
}

function SidebarRightAction({ icon, label, badge = false }: SidebarRightActionProps) {
  return (
    <button type="button" className="kit-sidebar-right-action" aria-label={label}>
      <span className="kit-sidebar-right-action-icon">
        <SidebarRightGlyph icon={icon} />
        {badge ? <span className="kit-sidebar-right-badge" /> : null}
      </span>
    </button>
  )
}

type SidebarRightCardProps = {
  icon: IconId
  title: string
}

function SidebarRightCard({ icon, title }: SidebarRightCardProps) {
  return (
    <button type="button" className="kit-sidebar-right-card">
      <span className="kit-sidebar-right-card-title">{title}</span>
      <span className="kit-sidebar-right-card-btn" aria-hidden>
        <SidebarRightGlyph icon={icon} />
      </span>
    </button>
  )
}

type SidebarRightProps = {
  minimize?: boolean
  skeleton?: boolean
  company?: string
}

function SidebarRightSkeleton({ minimize }: { minimize: boolean }) {
  return (
    <>
      <div className="kit-sidebar-right-top">
        <div className="kit-sidebar-right-profile-wrap">
          <div className="kit-sidebar-right-profile">
            <span className="kit-skeleton kit-skeleton-avatar" />
            {minimize ? null : (
              <span className="kit-sidebar-right-profile-copy">
                <span className="kit-skeleton-text">
                  <span className="kit-skeleton kit-skeleton-bar" />
                </span>
              </span>
            )}
          </div>
        </div>
        {minimize ? (
          <div className="kit-sidebar-right-actions">
            <span className="kit-sidebar-right-action">
              <span className="kit-skeleton kit-skeleton-avatar" />
            </span>
            <span className="kit-sidebar-right-action">
              <span className="kit-skeleton kit-skeleton-avatar" />
            </span>
          </div>
        ) : (
          <>
            <span className="kit-skeleton kit-sidebar-right-card" />
            <span className="kit-skeleton kit-sidebar-right-card" />
          </>
        )}
      </div>
      <div className="kit-sidebar-right-bottom">
        <span className="kit-skeleton kit-sidebar-right-chat-skeleton" />
      </div>
    </>
  )
}

export function SidebarRight({
  minimize = false,
  skeleton = false,
  company = 'ИП Лукьянюк Н.',
}: SidebarRightProps) {
  const className = [
    'kit-sidebar-right',
    minimize ? 'is-minimize' : '',
    skeleton ? 'is-skeleton' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside
      className={className}
      aria-busy={skeleton || undefined}
      aria-label={skeleton ? 'Загрузка' : undefined}
    >
      {skeleton ? (
        <SidebarRightSkeleton minimize={minimize} />
      ) : (
        <>
          <div className="kit-sidebar-right-top">
            <div className="kit-sidebar-right-profile-wrap">
              <button type="button" className="kit-sidebar-right-profile">
                <Avatar state="selected" icon="briefcase" />
                {minimize ? null : (
                  <>
                    <span className="kit-sidebar-right-profile-copy">
                      <span className="kit-sidebar-right-profile-title">
                        {company}
                      </span>
                    </span>
                    <span className="kit-sidebar-right-sort" aria-hidden />
                  </>
                )}
              </button>
            </div>
            {minimize ? (
              <div className="kit-sidebar-right-actions">
                <SidebarRightAction icon="bell" label="Уведомления" badge />
                <SidebarRightAction icon="pencil" label="Документы на подпись" />
              </div>
            ) : (
              <>
                <SidebarRightCard icon="bell" title="Уведомления" />
                <SidebarRightCard icon="pencil" title="Документы на подпись" />
              </>
            )}
          </div>
          <div className="kit-sidebar-right-bottom">
            <button
              type="button"
              className="kit-sidebar-right-chat"
              aria-label="Чат"
            >
              <SidebarRightGlyph icon="chat" />
            </button>
          </div>
        </>
      )}
    </aside>
  )
}

type BodyProps = {
  title?: string
  children: ReactNode
}

export function Body({ title, children }: BodyProps) {
  return (
    <section className="kit-body">
      {title ? <h1 className="kit-body-title">{title}</h1> : null}
      <div className="kit-body-content">{children}</div>
    </section>
  )
}

type DropdownProps = {
  children: ReactNode
  style?: CSSProperties
}

export function Dropdown({ children, style }: DropdownProps) {
  return (
    <div className="kit-dropdown" role="menu" style={style}>
      {children}
    </div>
  )
}

type DropdownItemProps = {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
}

export function DropdownItem({ children, selected, onClick }: DropdownItemProps) {
  return (
    <button
      type="button"
      className={`kit-dropdown-item${selected ? ' is-selected' : ''}`}
      role="menuitem"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
