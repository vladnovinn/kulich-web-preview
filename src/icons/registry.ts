export type IconEntry = {
  id: string
  name: string
  src: string
}

export const icons: IconEntry[] = [
  { id: 'home', name: 'Home', src: '/icons/home.svg' },
  { id: 'two-coins', name: 'Two coins', src: '/icons/two-coins.svg' },
  { id: 'calendar-check', name: 'Calendar check', src: '/icons/calendar-check.svg' },
  { id: 'pos-terminal', name: 'POS terminal', src: '/icons/pos-terminal.svg' },
  { id: 'coin', name: 'Coin', src: '/icons/coin.svg' },
  { id: 'wallet', name: 'Wallet', src: '/icons/wallet.svg' },
  { id: 'grid', name: 'Grid', src: '/icons/grid.svg' },
  { id: 'briefcase', name: 'Briefcase', src: '/icons/briefcase.svg' },
  { id: 'bell', name: 'Bell', src: '/icons/bell.svg' },
  { id: 'pencil', name: 'Pencil', src: '/icons/pencil.svg' },
  { id: 'chat', name: 'Chat', src: '/icons/chat.svg' },
]

export type IconId = (typeof icons)[number]['id']

export function getIcon(id: string): IconEntry | undefined {
  return icons.find((icon) => icon.id === id)
}
