import { Body, Cell } from '../kit/components'

export function BodyDemo() {
  return (
    <Body title="Главная">
      <Cell icon="wallet" title="Расчётный счёт" />
      <Cell icon="two-coins" title="Платежи сегодня" />
      <Cell icon="calendar-check" title="Ближайшие платежи" />
    </Body>
  )
}
