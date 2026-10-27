import { useEffect, useRef, useState } from 'react'
import { asset } from '../paths'

export type CompanyIcon =
  | 'user'
  | 'briefcase'
  | 'pass'
  | 'plus'
  | 'home'
  | 'globe'
  | 'logout'

export type CompanyBadge = 'crown' | 'forward'

export type CompanyRow = {
  title: string
  subtitle?: string
  inn?: string
  icon: CompanyIcon
  tile?: boolean
  badge?: CompanyBadge
  selected?: boolean
}

export type CompanyCellState = 'hover' | 'pressed'

export type CompanyAccount = {
  title: string
  subtitle?: string
  icon: 'user' | 'briefcase'
}

export type CompanySheetState = {
  id: string
  account: CompanyAccount
  credits?: CompanyRow[]
  business?: {
    rows: CompanyRow[]
    more?: string
  }
}

const glyphs: Record<CompanyIcon | 'user-light' | 'briefcase-light' | CompanyBadge | 'check' | 'arrow-right' | 'chevrons', string> = {
  user: asset('icons/company/user.svg'),
  'user-light': asset('icons/company/user-light.svg'),
  briefcase: asset('icons/company/briefcase.svg'),
  'briefcase-light': asset('icons/company/briefcase-light.svg'),
  pass: asset('icons/company/pass.svg'),
  plus: asset('icons/company/plus.svg'),
  home: asset('icons/company/home.svg'),
  globe: asset('icons/company/globe.svg'),
  logout: asset('icons/company/logout.svg'),
  crown: asset('icons/company/crown.svg'),
  forward: asset('icons/company/forward.svg'),
  check: asset('icons/company/check.svg'),
  'arrow-right': asset('icons/company/arrow-right.svg'),
  chevrons: asset('icons/sort-chevrons.svg'),
}

function Glyph({ name }: { name: keyof typeof glyphs }) {
  return <img className="company-sheet-glyph" src={glyphs[name]} alt="" />
}

function Avatar({
  icon,
  gold = false,
  tile = false,
  badge,
}: {
  icon: CompanyIcon
  gold?: boolean
  tile?: boolean
  badge?: CompanyBadge
}) {
  const glyph = gold ? (`${icon}-light` as 'user-light' | 'briefcase-light') : icon
  const tone = gold ? 'is-gold' : tile ? 'is-neutral' : 'is-plain'

  return (
    <span className={`company-sheet-avatar ${tone}`}>
      <Glyph name={glyph} />
      {badge ? (
        <span className="company-sheet-badge">
          <Glyph name={badge} />
        </span>
      ) : null}
    </span>
  )
}

function cellStateClass(interaction?: CompanyCellState) {
  return interaction ? ` is-${interaction}` : ''
}

function AccountPill({
  account,
  collapsed = false,
  inset = false,
  interaction,
  expanded = false,
  onClick,
}: {
  account: CompanyAccount
  collapsed?: boolean
  inset?: boolean
  interaction?: CompanyCellState
  expanded?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={`company-sheet-pill${collapsed ? ' is-collapsed' : ''}${inset ? ' is-inset' : ''}${cellStateClass(interaction)}`}
      aria-expanded={onClick ? expanded : undefined}
      aria-label={collapsed ? account.title : undefined}
      onClick={onClick}
    >
      <Avatar icon={account.icon} gold />
      {collapsed ? null : (
        <>
          <span className="company-sheet-pill-copy">
            <span className="company-sheet-pill-title">{account.title}</span>
            {account.subtitle ? (
              <span className="company-sheet-pill-subtitle">{account.subtitle}</span>
            ) : null}
          </span>
          <span className="company-sheet-chevron">
            <span
              className="company-sheet-chevron-icon"
              style={{
                maskImage: `url(${glyphs.chevrons})`,
                WebkitMaskImage: `url(${glyphs.chevrons})`,
              }}
            />
          </span>
        </>
      )}
    </button>
  )
}

function rowKind(row: CompanyRow) {
  if (row.icon === 'plus') return 'add'
  if (row.tile) return 'company'
  return 'plain'
}

function Row({ row, interaction }: { row: CompanyRow; interaction?: CompanyCellState }) {
  const kind = rowKind(row)

  return (
    <button
      type="button"
      className={`company-sheet-row is-${kind}${cellStateClass(interaction)}`}
    >
      <Avatar icon={row.icon} tile={row.tile} badge={row.badge} />
      <span className="company-sheet-row-copy">
        <span className="company-sheet-row-title">{row.title}</span>
        {row.subtitle ? <span className="company-sheet-row-subtitle">{row.subtitle}</span> : null}
      </span>
      {row.selected ? <Glyph name="check" /> : null}
      {kind === 'company' && row.inn ? (
        <span className="company-sheet-tooltip">
          <span className="company-sheet-tooltip-tail" />
          <span className="company-sheet-tooltip-body">
            <span className="company-sheet-tooltip-title">{row.title}</span>
            {row.inn ? <span className="company-sheet-tooltip-inn">ИНН {row.inn}</span> : null}
          </span>
        </span>
      ) : null}
    </button>
  )
}

function CompanySheetBody({ state }: { state: CompanySheetState }) {
  return (
    <>
      <div className="company-sheet-section">
        {state.credits?.length ? (
          <div className="company-sheet-credits">
            {state.credits.map((row) => (
              <Row key={row.title} row={row} />
            ))}
          </div>
        ) : null}
        {state.business ? (
          <div className="company-sheet-group">
            <div className="company-sheet-label">Бизнес</div>
            {state.business.rows.map((row, index) => (
              <Row key={`${row.title}-${index}`} row={row} />
            ))}
            {state.business.more ? (
              <div className="company-sheet-more">
                <span>{state.business.more}</span>
                <Glyph name="arrow-right" />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="company-sheet-separator" />
      <div className="company-sheet-section">
        {footer.map((row) => (
          <Row key={row.title} row={row} />
        ))}
      </div>
    </>
  )
}

const SCREEN_EDGE = 8
const SHEET_PAD = 8

type MorphAnchor = {
  top: number
  left: number
  width: number
  height: number
  right: number
}

function openMorphBox(anchor: MorphAnchor) {
  const wide = anchor.width >= 200
  if (!wide) {
    const width = Math.min(320, window.innerWidth - SCREEN_EDGE * 2)
    return {
      top: SCREEN_EDGE,
      left: window.innerWidth - SCREEN_EDGE - width,
      width,
    }
  }
  return {
    top: anchor.top - SHEET_PAD,
    left: anchor.left - SHEET_PAD,
    width: anchor.width + SHEET_PAD * 2,
  }
}

export function CompanySheetMorph({
  state,
  collapsed = false,
  dismissSignal = '',
}: {
  state: CompanySheetState
  collapsed?: boolean
  dismissSignal?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<MorphAnchor | null>(null)
  const [phase, setPhase] = useState<'closed' | 'open'>('closed')
  const [fixed, setFixed] = useState<{ top: number; left: number; width: number } | null>(null)
  const signalRef = useRef(dismissSignal)
  const wide = phase === 'open'

  useEffect(() => {
    if (signalRef.current === dismissSignal) return
    signalRef.current = dismissSignal
    setPhase('closed')
    setFixed(null)
  }, [dismissSignal])

  useEffect(() => {
    if (phase !== 'open') return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (rootRef.current?.contains(target)) return
      setPhase('closed')
      setFixed(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPhase('closed')
        setFixed(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [phase])

  const close = () => {
    setPhase('closed')
    setFixed(null)
  }

  const toggle = () => {
    if (phase === 'open') {
      close()
      return
    }
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return
    const anchor = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      right: rect.right,
    }
    anchorRef.current = anchor
    const next = openMorphBox(anchor)
    setFixed({ top: next.top, left: next.left, width: next.width })
    setPhase('open')
  }

  const anchor = anchorRef.current

  return (
    <>
      {fixed && anchor ? (
        <span
          className={`company-morph-placeholder${collapsed ? ' is-collapsed' : ''}`}
          style={{ height: anchor.height }}
          aria-hidden
        />
      ) : null}
      <div
        ref={rootRef}
        className={`company-morph${collapsed ? ' is-collapsed' : ''}${phase === 'open' ? ' is-open' : ''}${fixed ? ' is-fixed' : ''}`}
        style={fixed ? { top: fixed.top, left: fixed.left, width: fixed.width } : undefined}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="company-morph-panel" role="group" aria-label="Личный кабинет">
          <AccountPill
            account={state.account}
            collapsed={collapsed && !wide}
            expanded={phase === 'open'}
            onClick={toggle}
          />
          <div className="company-morph-rest" inert={phase !== 'open'} aria-hidden={phase !== 'open'}>
            <CompanySheetBody state={state} />
          </div>
        </div>
      </div>
    </>
  )
}

export function CompanyProfileCell({
  account,
  interaction,
}: {
  account: CompanyAccount
  interaction?: CompanyCellState
}) {
  return <AccountPill account={account} interaction={interaction} />
}

export function CompanyMenuCell({
  row,
  interaction,
}: {
  row: CompanyRow
  interaction?: CompanyCellState
}) {
  return <Row row={row} interaction={interaction} />
}

const footer: CompanyRow[] = [
  { title: 'Tbank.ru', icon: 'globe' },
  { title: 'Выйти', icon: 'logout' },
]

export const lkCompanySheet: CompanySheetState = {
  id: 'lk',
  account: { title: 'AO Слетать ру', subtitle: 'Иван Лыткин', icon: 'briefcase' },
  credits: [
    { title: 'Профиль компании', icon: 'pass' },
    { title: 'Мой профиль', icon: 'user' },
  ],
  business: {
    rows: [
      { title: 'AO Слетать ру', icon: 'briefcase', tile: true, selected: true },
      {
        title: 'Холдинг ООО «Старворс»',
        subtitle: '24 компании',
        icon: 'briefcase',
        tile: true,
      },
      { title: 'ООО «Пошла тепленькая»', icon: 'briefcase', tile: true },
      { title: 'Добавить компанию', icon: 'plus', tile: true },
    ],
    more: 'Посмотреть все',
  },
}

export function CompanySheetMenu({ state }: { state: CompanySheetState }) {
  return (
    <div className="company-sheet">
      <div className="company-sheet-section">
        <AccountPill account={state.account} inset />
      </div>
      <CompanySheetBody state={state} />
    </div>
  )
}

export function CompanySheet({ state }: { state: CompanySheetState }) {
  return (
    <div className="company-sheet-set">
      <AccountPill account={state.account} collapsed />
      <AccountPill account={state.account} />
      <CompanySheetMenu state={state} />
    </div>
  )
}
