import { useId, useMemo } from 'react'
import bell from '../../public/icons/bell.svg?raw'
import briefcase from '../../public/icons/briefcase.svg?raw'
import calendarCheck from '../../public/icons/calendar-check.svg?raw'
import chat from '../../public/icons/chat.svg?raw'
import chevronDown from '../../public/icons/chevron-down.svg?raw'
import coin from '../../public/icons/coin.svg?raw'
import cross from '../../public/icons/cross.svg?raw'
import doc from '../../public/icons/doc.svg?raw'
import docArrowUp from '../../public/icons/doc-arrow-up.svg?raw'
import grid from '../../public/icons/grid.svg?raw'
import home from '../../public/icons/home.svg?raw'
import list from '../../public/icons/list.svg?raw'
import loader from '../../public/icons/loader.svg?raw'
import magnifier from '../../public/icons/magnifier.svg?raw'
import pencil from '../../public/icons/pencil.svg?raw'
import posTerminal from '../../public/icons/pos-terminal.svg?raw'
import sortChevrons from '../../public/icons/sort-chevrons.svg?raw'
import star from '../../public/icons/star.svg?raw'
import tariffs from '../../public/icons/tariffs.svg?raw'
import twoCoins from '../../public/icons/two-coins.svg?raw'
import wallet from '../../public/icons/wallet.svg?raw'

const sources: Record<string, string> = {
  bell,
  briefcase,
  'calendar-check': calendarCheck,
  chat,
  'chevron-down': chevronDown,
  coin,
  cross,
  doc,
  'doc-arrow-up': docArrowUp,
  grid,
  home,
  list,
  loader,
  magnifier,
  pencil,
  'pos-terminal': posTerminal,
  'sort-chevrons': sortChevrons,
  star,
  tariffs,
  'two-coins': twoCoins,
  wallet,
}

function prepareIconSvg(raw: string, uid: string): string {
  const prefix = `i${uid.replace(/[^A-Za-z0-9_-]/g, '')}`
  let svg = raw.replace(/^\uFEFF?/, '').replace(/<\?xml[\s\S]*?\?>\s*/, '').trim()
  svg = svg.replace(/\bid="([^"]+)"/g, (_, id: string) => `id="${prefix}-${id}"`)
  svg = svg.replace(/url\(#([^)]+)\)/g, (_, id: string) => `url(#${prefix}-${id})`)
  svg = svg
    .replace(/fill="#333333"/g, 'fill="currentColor"')
    .replace(/fill="black"/g, 'fill="currentColor"')
    .replace(/stop-color="#333333"/g, 'stop-color="currentColor"')
  svg = svg.replace(/<svg\b([^>]*?)\swidth="[^"]*"/, '<svg$1 width="100%"')
  svg = svg.replace(/<svg\b([^>]*?)\sheight="[^"]*"/, '<svg$1 height="100%"')
  return svg
}

export function IconSvg({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const uid = useId()
  const html = useMemo(() => {
    const raw = sources[name]
    return raw ? prepareIconSvg(raw, uid) : ''
  }, [name, uid])

  if (!html) return null

  return (
    <span
      className={className ? `kit-icon ${className}` : 'kit-icon'}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
