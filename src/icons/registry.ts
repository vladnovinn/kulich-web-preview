import { asset } from '../paths'

export type IconEntry = {
  id: string
  name: string
  src: string
}

export const icons: IconEntry[] = [
  { id: 'home', name: 'Home', src: asset('icons/home.svg') },
  { id: 'two-coins', name: 'Two coins', src: asset('icons/two-coins.svg') },
  { id: 'calendar-check', name: 'Calendar check', src: asset('icons/calendar-check.svg') },
  { id: 'pos-terminal', name: 'POS terminal', src: asset('icons/pos-terminal.svg') },
  { id: 'coin', name: 'Coin', src: asset('icons/coin.svg') },
  { id: 'wallet', name: 'Wallet', src: asset('icons/wallet.svg') },
  { id: 'grid', name: 'Grid', src: asset('icons/grid.svg') },
  { id: 'briefcase', name: 'Briefcase', src: asset('icons/briefcase.svg') },
  { id: 'bell', name: 'Bell', src: asset('icons/bell.svg') },
  { id: 'pencil', name: 'Pencil', src: asset('icons/pencil.svg') },
  { id: 'chat', name: 'Chat', src: asset('icons/chat.svg') },
]

export type IconId = (typeof icons)[number]['id']

export function getIcon(id: string): IconEntry | undefined {
  return icons.find((icon) => icon.id === id)
}
