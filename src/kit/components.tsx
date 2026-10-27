import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { IconSvg } from '../icons/inline'
import { type IconId } from '../icons/registry'
import { asset } from '../paths'
import { CompanySheetMorph, lkCompanySheet } from './CompanySheet'

export type AvatarState = 'normal' | 'hover' | 'selected'

type AvatarProps = {
  state?: AvatarState
  icon?: IconId
}

export function Avatar({ state = 'normal', icon = 'home' }: AvatarProps) {
  return (
    <span className={`kit-avatar kit-avatar-${state}`}>
      <span className="kit-avatar-icon">
        <IconSvg name={icon} className="kit-avatar-glyph" />
      </span>
    </span>
  )
}

export type BadgeSize = 's' | 'm' | 'l' | 'xl'

type BadgeProps = {
  children: ReactNode
  size?: BadgeSize
}

export function Badge({ children, size = 'l' }: BadgeProps) {
  return (
    <span className="kit-badge" data-size={size}>
      {children}
    </span>
  )
}

export type ButtonAppearance =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'flat'
  | 'outline'
  | 'floating'

export type ButtonSize = 'xs' | 's' | 'm' | 'l'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: ButtonAppearance
  size?: ButtonSize
}

export function Button({
  appearance = 'primary',
  size = 'l',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`kit-button${className ? ` ${className}` : ''}`}
      data-appearance={appearance}
      data-size={size}
    >
      {children}
    </button>
  )
}

export type HeaderSize =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-l'
  | 'body-m'
  | 'body-s'

type HeaderProps = {
  size?: HeaderSize
  title: ReactNode
  subtitle?: ReactNode
  caption?: ReactNode
  accessories?: ReactNode
  description?: ReactNode
}

export function headerButtonSize(size: HeaderSize): ButtonSize {
  switch (size) {
    case 'h1':
      return 'l'
    case 'h2':
    case 'h3':
      return 'm'
    case 'h4':
      return 's'
    default:
      return 'xs'
  }
}

export function headerBadgeSize(size: HeaderSize): BadgeSize {
  switch (size) {
    case 'h6':
    case 'body-l':
    case 'body-m':
    case 'body-s':
      return 's'
    default:
      return 'm'
  }
}

export function Header({
  size = 'h5',
  title,
  subtitle,
  caption,
  accessories,
  description,
}: HeaderProps) {
  return (
    <div className="kit-header-block">
      <header className="kit-header" data-size={size}>
        <hgroup className="kit-header-title">
          {caption ? <p className="kit-header-caption">{caption}</p> : null}
          <h2>{title}</h2>
          {subtitle ? <p className="kit-header-subtitle">{subtitle}</p> : null}
        </hgroup>
        {accessories ? (
          <aside className="kit-header-accessories">{accessories}</aside>
        ) : null}
      </header>
      {description ? <p className="kit-header-description">{description}</p> : null}
    </div>
  )
}

export type CardSpace = 'normal' | 'compact'
export type CardPlatform = 'web' | 'ios'

type CardLargeProps = {
  space?: CardSpace
  platform?: CardPlatform
  as?: 'div' | 'button'
  className?: string
  children: ReactNode
  onClick?: () => void
}

export function CardLarge({
  space = 'normal',
  platform = 'web',
  as = 'div',
  className,
  children,
  onClick,
}: CardLargeProps) {
  const classes = `kit-card-large${className ? ` ${className}` : ''}`

  if (as === 'button') {
    return (
      <button type="button" className={classes} data-space={space} data-platform={platform} onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <div className={classes} data-space={space} data-platform={platform}>
      {children}
    </div>
  )
}

type CardHeadingProps = {
  title: ReactNode
  subtitle?: ReactNode
  accessories?: ReactNode
}

export function CardHeading({ title, subtitle, accessories }: CardHeadingProps) {
  return (
    <header className="kit-card-head">
      <h2 className="kit-card-heading">
        {title}
        {subtitle ? <span className="kit-card-subtitle">{subtitle}</span> : null}
      </h2>
      {accessories ? <aside className="kit-card-accessories">{accessories}</aside> : null}
    </header>
  )
}

export function CardAvatar({ icon = 'star' }: { icon?: string }) {
  return (
    <span className="kit-card-avatar" aria-hidden>
      <IconSvg name={icon} />
    </span>
  )
}

type CardRowProps = {
  title: ReactNode
  description?: ReactNode
  accessory?: ReactNode
  as?: 'div' | 'button'
  onClick?: () => void
}

export function CardRow({ title, description, accessory, as = 'div', onClick }: CardRowProps) {
  const content = (
    <>
      <CardAvatar />
      <span className="kit-card-row-copy">
        <span className="kit-card-row-title">{title}</span>
        {description ? <span className="kit-card-row-description">{description}</span> : null}
      </span>
      {accessory}
    </>
  )

  if (as === 'button') {
    return (
      <button type="button" className="kit-card-row" onClick={onClick}>
        {content}
      </button>
    )
  }

  return <div className="kit-card-row">{content}</div>
}

type CardMediumProps = {
  title: ReactNode
  subtitle?: ReactNode
}

export function CardMedium({ title, subtitle }: CardMediumProps) {
  return (
    <article className="kit-card-medium">
      <span className="kit-card-plus" aria-hidden>
        <IconSvg name="grid" />
      </span>
      <h3 className="kit-card-medium-title">
        {title}
        {subtitle ? <span className="kit-card-subtitle">{subtitle}</span> : null}
      </h3>
    </article>
  )
}

export type SegmentedSize = 's' | 'm' | 'l'

export type SegmentedOption = {
  value: string
  label: ReactNode
  badge?: ReactNode
  disabled?: boolean
  menu?: SegmentedOption[]
}

type SegmentedProps = {
  items: SegmentedOption[]
  value?: string
  defaultValue?: string
  size?: SegmentedSize
  disabled?: boolean
  fullWidth?: boolean
  collapseOverflow?: boolean
  onChange?: (value: string) => void
}

export function Segmented({
  items,
  value,
  defaultValue,
  size = 's',
  disabled = false,
  fullWidth = false,
  collapseOverflow = false,
  onChange,
}: SegmentedProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.value ?? '',
  )
  const selectedValue = value ?? internalValue
  const orderedItems = useMemo(
    () => [
      ...items.filter((item) => !item.menu?.length),
      ...items.filter((item) => item.menu?.length),
    ],
    [items],
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [openValue, setOpenValue] = useState<string | null>(null)
  const [collapsedValues, setCollapsedValues] = useState<string[]>([])
  const [pinnedValue, setPinnedValue] = useState<string | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({})
  const visibleItems = useMemo(() => {
    const visible: SegmentedOption[] = []
    for (const item of orderedItems) {
      if (item.menu?.length && pinnedValue) {
        const pinned = item.menu.find((menuItem) => menuItem.value === pinnedValue)
        if (pinned) visible.push(pinned)
      }
      visible.push(item)
    }
    return visible
  }, [orderedItems, pinnedValue])
  const collapsedSet = useMemo(
    () => new Set(collapseOverflow ? collapsedValues : []),
    [collapseOverflow, collapsedValues],
  )
  const displayItems = useMemo(() => {
    if (!collapseOverflow) return visibleItems
    const menuParent = visibleItems.find((item) => item.menu?.length)
    const overflowItems = visibleItems.filter((item) => collapsedSet.has(item.value))
    if (!overflowItems.length) return visibleItems
    const row = visibleItems.filter((item) => !item.menu?.length && !collapsedSet.has(item.value))
    const moreMenu = [
      ...overflowItems.map(({ value: itemValue, label, badge, disabled: itemDisabled }) => ({
        value: itemValue,
        label,
        badge,
        disabled: itemDisabled,
      })),
      ...(menuParent?.menu ?? []),
    ]
    const more: SegmentedOption = menuParent
      ? { ...menuParent, menu: moreMenu }
      : { value: '__overflow', label: 'Еще', menu: moreMenu }
    return [...row, more]
  }, [collapseOverflow, collapsedSet, visibleItems])
  const activeIndex = displayItems.findIndex((item) => item.value === selectedValue)

  const selectValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue)
    onChange?.(nextValue)
  }

  useLayoutEffect(() => {
    if (!collapseOverflow) {
      setCollapsedValues((current) => (current.length ? [] : current))
      return
    }

    const root = rootRef.current
    const measure = measureRef.current
    const parent = root?.parentElement
    if (!root || !measure || !parent) return

    const fit = () => {
      const parentStyle = getComputedStyle(parent)
      const gap = Number.parseFloat(parentStyle.columnGap) || Number.parseFloat(parentStyle.gap) || 0
      let siblings = 0
      let siblingCount = 0
      for (const child of parent.children) {
        if (child === root) continue
        const style = getComputedStyle(child)
        if (style.display === 'none' || style.position === 'absolute') continue
        siblings += (child as HTMLElement).offsetWidth
        siblingCount += 1
      }
      const available = parent.clientWidth - siblings - gap * siblingCount
      const widths = new Map<string, number>()
      measure.querySelectorAll<HTMLButtonElement>('button[data-value]').forEach((button) => {
        widths.set(button.dataset.value ?? '', button.offsetWidth)
      })

      const menuParent = visibleItems.find((item) => item.menu?.length)
      const unselected = visibleItems.filter((item) => !item.menu?.length && item.value !== selectedValue)
      const selectedWidth = widths.get(selectedValue) ?? 0
      const menuWidth = menuParent ? widths.get(menuParent.value) ?? 0 : 0
      const moreWidth = widths.get('__overflow') ?? menuWidth
      const take = (budget: number) => {
        const hidden: string[] = []
        let rest = budget
        let cut = false
        for (const item of unselected) {
          const itemWidth = widths.get(item.value) ?? 0
          if (!cut && rest >= itemWidth) rest -= itemWidth
          else {
            cut = true
            hidden.push(item.value)
          }
        }
        return hidden
      }

      let hidden = take(available - selectedWidth - menuWidth)
      if (hidden.length > 0 && !menuParent) hidden = take(available - selectedWidth - moreWidth)
      setCollapsedValues((current) =>
        current.length === hidden.length && current.every((entry, index) => entry === hidden[index])
          ? current
          : hidden,
      )
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(parent)
    return () => observer.disconnect()
  }, [collapseOverflow, selectedValue, visibleItems])

  useLayoutEffect(() => {
    const root = rootRef.current
    const item = itemRefs.current[activeIndex]
    if (!root || !item) return

    const update = () => {
      const rootRect = root.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()
      setIndicatorStyle({
        '--kit-segmented-left': `${itemRect.left - rootRect.left}px`,
        '--kit-segmented-width': `${itemRect.width}px`,
      } as CSSProperties)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(root)
    observer.observe(item)
    return () => observer.disconnect()
  }, [activeIndex, displayItems, selectedValue, size])

  useEffect(() => {
    if (openValue === null) return

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setOpenValue(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenValue(null)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openValue])

  const originalMenu = visibleItems.find((item) => item.menu?.length)?.menu

  return (
    <div
      ref={rootRef}
      className={`kit-segmented${fullWidth ? ' is-full-width' : ''}`}
      data-size={size}
      aria-disabled={disabled || undefined}
      style={indicatorStyle}
    >
      <span className="kit-segmented-indicator" aria-hidden />
      {collapseOverflow ? (
        <div className="kit-segmented-measure" ref={measureRef} aria-hidden>
          {visibleItems.map((item) => (
            <span key={item.value} className="kit-segmented-item">
              <button type="button" tabIndex={-1} data-value={item.value}>
                <span>{item.label}</span>
                {item.badge}
                {item.menu ? <IconSvg name="chevron-down" className="kit-segmented-chevron" /> : null}
              </button>
            </span>
          ))}
          {visibleItems.some((item) => item.menu?.length) ? null : (
            <span className="kit-segmented-item">
              <button type="button" tabIndex={-1} data-value="__overflow">
                <span>Еще</span>
                <IconSvg name="chevron-down" className="kit-segmented-chevron" />
              </button>
            </span>
          )}
        </div>
      ) : null}
      {displayItems.map((item, index) => {
        const selected = index === activeIndex
        const open = openValue === item.value

        return (
          <span key={item.value} className="kit-segmented-item">
            <button
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              type="button"
              className={selected ? 'is-active' : undefined}
              disabled={disabled || item.disabled}
              aria-pressed={item.menu ? undefined : selected}
              aria-expanded={item.menu ? open : undefined}
              aria-haspopup={item.menu ? 'menu' : undefined}
              onClick={() => {
                if (!item.menu) {
                  selectValue(item.value)
                  setOpenValue(null)
                  return
                }
                setOpenValue(open ? null : item.value)
              }}
            >
              <span>{item.label}</span>
              {item.badge}
              {item.menu ? (
                <IconSvg
                  name="chevron-down"
                  className={`kit-segmented-chevron${open ? ' is-open' : ''}`}
                />
              ) : null}
            </button>
            {item.menu && open ? (
              <Dropdown
                className={`kit-segmented-menu${
                  displayItems.length === 2 && index === displayItems.length - 1
                    ? ' is-align-start'
                    : ''
                }`}
              >
                {item.menu.map((menuItem) => (
                  <DropdownItem
                    key={menuItem.value}
                    selected={menuItem.value === selectedValue}
                    disabled={menuItem.disabled}
                    onClick={() => {
                      selectValue(menuItem.value)
                      if (originalMenu?.some((entry) => entry.value === menuItem.value)) {
                        setPinnedValue(menuItem.value)
                      }
                      setOpenValue(null)
                    }}
                  >
                    <span>{menuItem.label}</span>
                    {menuItem.badge}
                  </DropdownItem>
                ))}
              </Dropdown>
            ) : null}
          </span>
        )
      })}
    </div>
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
  chevron?: 'up' | 'down' | 'right'
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
  const titleRef = useRef<HTMLSpanElement>(null)
  const [titleOverflow, setTitleOverflow] = useState(false)

  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el) return

    const measure = () => {
      setTitleOverflow(el.scrollWidth - el.clientWidth > 1)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [title, showCopy])

  const accessory = loading ? (
    <span className="kit-cell-accessory">
      <IconSvg name="loader" className="kit-cell-loader" />
    </span>
  ) : chevron ? (
    <span className="kit-cell-accessory is-chevron">
      <IconSvg name="chevron-down" className={`kit-cell-chevron is-${chevron}`} />
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
          <span
            ref={titleRef}
            className={`kit-cell-title${titleOverflow ? ' is-overflow' : ''}`}
          >
            {title}
          </span>
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
  collapsed?: boolean
}

export function SearchBackdrop() {
  return (
    <div className="kit-search-bg" aria-hidden>
      <span className="kit-search-bg-solid" />
      <span className="kit-search-bg-blur">
        <span />
        <span />
        <span />
        <span />
      </span>
    </div>
  )
}

export function SearchInput({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Поиск',
  disabled,
  collapsed = false,
}: SearchInputProps) {
  const isControlled = value !== undefined

  return (
    <div className={`kit-search${collapsed ? ' is-collapsed' : ''}${disabled ? ' is-disabled' : ''}`}>
      {collapsed ? (
        <Button
          appearance="floating"
          className="kit-search-button"
          aria-label={placeholder}
          disabled={disabled}
        >
          <IconSvg name="magnifier" className="kit-search-icon" />
        </Button>
      ) : (
        <>
          <SearchBackdrop />
          <label className="kit-search-field">
            <span className="visually-hidden">{placeholder}</span>
            <IconSvg name="magnifier" className="kit-search-icon" />
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
        </>
      )}
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
  const navClipRef = useRef<HTMLDivElement>(null)
  const collapseAnimationTimerRef = useRef<number | undefined>(undefined)
  const collapseAnimationActiveRef = useRef(false)
  const [pinned, setPinned] = useState(false)
  const [hoverLocked, setHoverLocked] = useState(false)
  const [collapseAnimating, setCollapseAnimating] = useState(false)
  const [menuHold, setMenuHoldState] = useState(false)
  const setMenuHold = useCallback((hold: boolean) => {
    setMenuHoldState(hold)
  }, [])
  const runCollapseAnimation = useCallback(() => {
    window.clearTimeout(collapseAnimationTimerRef.current)
    collapseAnimationActiveRef.current = true
    setCollapseAnimating(true)
    collapseAnimationTimerRef.current = window.setTimeout(
      () => {
        collapseAnimationActiveRef.current = false
        setCollapseAnimating(false)
      },
      780,
    )
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    const clip = navClipRef.current
    if (!root || !clip) return

    const updateScrollbar = () => {
      const maxScroll = clip.scrollHeight - clip.clientHeight
      const trackHeight = Math.max(0, clip.clientHeight - 40)
      const thumbHeight = maxScroll > 1
        ? Math.max(32, trackHeight * (clip.clientHeight / clip.scrollHeight))
        : 0
      const thumbOffset = maxScroll > 1
        ? (trackHeight - thumbHeight) * (clip.scrollTop / maxScroll)
        : 0

      root.classList.toggle('has-nav-overflow', maxScroll > 1)
      root.classList.toggle('has-nav-scroll-top', clip.scrollTop > 1)
      root.classList.toggle(
        'has-nav-scroll-bottom',
        maxScroll - clip.scrollTop > 1,
      )
      root.style.setProperty('--kit-nav-scrollbar-height', `${thumbHeight}px`)
      root.style.setProperty('--kit-nav-scrollbar-offset', `${thumbOffset}px`)
    }

    const resizeObserver = new ResizeObserver(updateScrollbar)
    resizeObserver.observe(clip)
    Array.from(clip.children).forEach((child) => resizeObserver.observe(child))
    const mutationObserver = new MutationObserver(() => {
      Array.from(clip.children).forEach((child) => resizeObserver.observe(child))
      updateScrollbar()
    })
    mutationObserver.observe(clip, { childList: true, subtree: true })
    clip.addEventListener('scroll', updateScrollbar, { passive: true })
    updateScrollbar()

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      clip.removeEventListener('scroll', updateScrollbar)
      root.classList.remove('has-nav-overflow')
      root.classList.remove('has-nav-scroll-top')
      root.classList.remove('has-nav-scroll-bottom')
      root.style.removeProperty('--kit-nav-scrollbar-height')
      root.style.removeProperty('--kit-nav-scrollbar-offset')
    }
  }, [])

  useEffect(() => {
    if (!minimize) {
      window.clearTimeout(collapseAnimationTimerRef.current)
      collapseAnimationActiveRef.current = false
      setPinned(false)
      setHoverLocked(false)
      setCollapseAnimating(false)
    }
  }, [minimize])

  useEffect(
    () => () => window.clearTimeout(collapseAnimationTimerRef.current),
    [],
  )

  useEffect(() => {
    if (!minimize || !pinned || skeleton) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (rootRef.current?.contains(target)) return
      if (target instanceof Element && target.closest('.kit-dropdown')) return
      setPinned(false)
      runCollapseAnimation()
      const active = document.activeElement
      if (active instanceof HTMLElement && rootRef.current?.contains(active)) {
        active.blur()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [minimize, pinned, runCollapseAnimation, skeleton])

  const collapseFlyout = useCallback(() => {
    setPinned(false)
    setMenuHoldState(false)
    setHoverLocked(true)
    runCollapseAnimation()
    const active = document.activeElement
    if (active instanceof HTMLElement && rootRef.current?.contains(active)) {
      active.blur()
    }
  }, [runCollapseAnimation])

  const handleMenuClick = () => {
    if (skeleton) {
      onMenuClick?.()
      return
    }
    if (pinned) collapseFlyout()
    else {
      window.clearTimeout(collapseAnimationTimerRef.current)
      collapseAnimationActiveRef.current = false
      setPinned(true)
      setHoverLocked(false)
      setCollapseAnimating(false)
    }
    onMenuClick?.()
  }

  const handleMouseLeave = () => {
    setHoverLocked(false)
    if (
      minimize &&
      !pinned &&
      !skeleton &&
      !collapseAnimationActiveRef.current
    ) {
      runCollapseAnimation()
    }
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (
      event.relatedTarget instanceof Node &&
      rootRef.current?.contains(event.relatedTarget)
    ) {
      return
    }
    if (
      minimize &&
      !pinned &&
      !skeleton &&
      !collapseAnimationActiveRef.current
    ) {
      runCollapseAnimation()
    }
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
    collapseAnimating ? 'is-collapse-animating' : '',
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
        onMouseLeave={handleMouseLeave}
        onBlur={handleBlur}
      >
        <SidebarBrand minimize={minimize} />
        <div className="kit-sidebar-content">
          <nav
            className="kit-sidebar-nav"
            aria-label="Основное меню"
            onClick={handleNavClick}
          >
            <div ref={navClipRef} className="kit-sidebar-nav-clip">
              {skeleton ? <SidebarNavSkeleton /> : children}
            </div>
            <span className="kit-sidebar-nav-scrollbar" aria-hidden>
              <span className="kit-sidebar-nav-scrollbar-thumb" />
            </span>
          </nav>
          {minimize ? (
            <button
              type="button"
              className={`kit-sidebar-menu-btn${pinned ? ' is-selected' : ''}`}
              aria-label={pinned ? 'Закрыть меню' : 'Меню'}
              aria-pressed={pinned}
              onClick={handleMenuClick}
            >
              <IconSvg
                name={pinned ? 'cross' : 'list'}
                className="kit-sidebar-menu-icon"
              />
            </button>
          ) : null}
        </div>
      </aside>
    </SidebarLeftContext.Provider>
  )
}

function SidebarRightGlyph({ icon }: { icon: IconId }) {
  return <IconSvg name={icon} className="kit-sidebar-right-glyph" />
}

type SidebarRightActionProps = {
  icon: IconId
  label: string
  badge?: boolean
  tip?: 'side' | 'top'
}

function SidebarRightAction({ icon, label, badge = false, tip = 'side' }: SidebarRightActionProps) {
  return (
    <button
      type="button"
      className={`kit-sidebar-right-action has-tip-${tip}`}
      aria-label={label}
    >
      <span className="kit-sidebar-right-action-icon">
        <SidebarRightGlyph icon={icon} />
        {badge ? <span className="kit-sidebar-right-badge" /> : null}
      </span>
      <span className="kit-sidebar-tip" role="tooltip" aria-hidden="true">
        {tip === 'top' ? <span className="kit-sidebar-tip-tail" /> : null}
        <span className="kit-sidebar-tip-body">{label}</span>
        {tip === 'side' ? <span className="kit-sidebar-tip-tail" /> : null}
      </span>
    </button>
  )
}

export function SidebarRightToolbar({
  skeleton = false,
  dismissSignal = '',
}: {
  skeleton?: boolean
  dismissSignal?: string
}) {
  if (skeleton) {
    return (
      <div className="kit-sidebar-right-header" aria-hidden>
        <span className="kit-skeleton kit-sidebar-right-header-card" />
        <span className="kit-skeleton kit-sidebar-right-header-skeleton" />
      </div>
    )
  }

  return (
    <div className="kit-sidebar-right-header">
      <div className="kit-sidebar-right-header-card">
        <SidebarRightAction icon="pencil" label="Документы на подпись" tip="top" />
        <SidebarRightAction icon="bell" label="Уведомления" badge tip="top" />
      </div>
      <CompanySheetMorph state={lkCompanySheet} collapsed dismissSignal={dismissSignal} />
    </div>
  )
}

export function SidebarRightChat({ skeleton = false }: { skeleton?: boolean }) {
  if (skeleton) {
    return <span className="kit-skeleton kit-sidebar-right-chat-skeleton is-floating" aria-hidden />
  }

  return (
    <button type="button" className="kit-sidebar-right-chat is-floating" aria-label="Чат">
      <SidebarRightGlyph icon="chat" />
    </button>
  )
}

type SidebarRightCardProps = {
  icon: IconId
  title: string
}

function SidebarRightCard({ icon, title }: SidebarRightCardProps) {
  const titleRef = useRef<HTMLSpanElement>(null)
  const [overflow, setOverflow] = useState(false)

  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el) return

    const measure = () => {
      setOverflow(el.scrollWidth - el.clientWidth > 1)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [title])

  return (
    <button type="button" className="kit-sidebar-right-card">
      <span
        ref={titleRef}
        className={`kit-sidebar-right-card-title${overflow ? ' is-overflow' : ''}`}
      >
        {title}
      </span>
      <span className="kit-sidebar-right-card-btn" aria-hidden>
        <SidebarRightGlyph icon={icon} />
      </span>
    </button>
  )
}

type SidebarRightProps = {
  minimize?: boolean
  skeleton?: boolean
  dismissSignal?: string
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
  dismissSignal = '',
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
              <CompanySheetMorph
                state={lkCompanySheet}
                collapsed={minimize}
                dismissSignal={dismissSignal}
              />
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
  className?: string
  style?: CSSProperties
}

export function Dropdown({ children, className, style }: DropdownProps) {
  return (
    <div
      className={`kit-dropdown${className ? ` ${className}` : ''}`}
      role="menu"
      style={style}
    >
      {children}
    </div>
  )
}

type DropdownItemProps = {
  children: ReactNode
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function DropdownItem({
  children,
  selected,
  disabled,
  onClick,
}: DropdownItemProps) {
  return (
    <button
      type="button"
      className={`kit-dropdown-item${selected ? ' is-selected' : ''}`}
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
