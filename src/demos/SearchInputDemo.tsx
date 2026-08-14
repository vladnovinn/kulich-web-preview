import { SearchInput } from '../kit/components'

const rows = [
  'Платежи',
  'Выставить счёт',
  'Выписка',
  'Самозанятые',
  'Бухгалтерия',
  'Торговый эквайринг',
  'Интернет-эквайринг',
  'Брокерский счёт',
  'Зарплатный проект',
  'Кредиты',
  'Депозиты',
  'Все сервисы',
  'Настройки',
  'Документы',
  'Уведомления',
]

export function SearchInputDemo() {
  return (
    <div className="demo-search-page">
      <p className="demo-caption">Скролл под поле</p>
      <div className="demo-search-stage">
        <SearchInput placeholder="Поиск" />
        <div className="demo-search-scroller">
          {rows.map((title) => (
            <p key={title} className="demo-search-row">
              {title}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
