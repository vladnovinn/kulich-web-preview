import { useState } from 'react'
import { IconSvg } from '../icons/inline'

type ServiceTone = 'gold' | 'rose' | 'teal' | 'brown' | 'orange' | 'green' | 'coral' | 'slate'

type ServiceGroup = {
  title: string
  tone: ServiceTone
  items: string[]
}

const wideColumns: ServiceGroup[][] = [
  [
    {
      title: 'Бухгалтерия',
      tone: 'gold',
      items: ['Бухгалтерия', 'Отчетность', 'Документы', 'ЭДО', 'Выставление счетов', 'Контрагенты'],
    },
    {
      title: 'Документы',
      tone: 'gold',
      items: ['Выписки', 'Справки', 'Счета-фактуры', 'Платежные требования', 'ЭДО', 'Транспортный ЭДО'],
    },
    {
      title: 'Электронные подписи',
      tone: 'gold',
      items: ['Электронные подписи', 'Настройка компьютера'],
    },
    {
      title: 'Работа с сотрудниками',
      tone: 'rose',
      items: ['Зарплатный проект', 'Выплаты самозанятым', 'Мгновенные выплаты', 'Подбор персонала', 'ESOP'],
    },
  ],
  [
    {
      title: 'Авто',
      tone: 'rose',
      items: ['Лизинг', 'Топливо', 'Штрафы', 'Страхование'],
    },
    {
      title: 'Деньги',
      tone: 'teal',
      items: [
        'Счета и платежи',
        'Кредит',
        'Бизнес-карта',
        'Брокерский счёт',
        'ВЭД',
        'Безакцептные списания',
        'Инкассовые поручения',
        'Кэш-пулинг',
        'Финансовые инструменты',
      ],
    },
    {
      title: 'Работа с наличными',
      tone: 'teal',
      items: ['Доставка наличных', 'Самоинкассация'],
    },
  ],
  [
    {
      title: 'Госзакупки',
      tone: 'brown',
      items: ['Мои госзакупки', 'Банковские гарантии'],
    },
    {
      title: 'Выгода от Т-Бизнеса',
      tone: 'orange',
      items: ['Партнерская программа', 'Приведи своих', 'Бонусы'],
    },
    {
      title: 'Прием платежей',
      tone: 'green',
      items: ['Торговый эквайринг', 'Интернет-эквайринг', 'Оплаты от\u00A0физлиц'],
    },
    {
      title: 'Оплата частями',
      tone: 'rose',
      items: ['Рассрочки', 'Долями'],
    },
    {
      title: 'Привлечение клиентов',
      tone: 'coral',
      items: ['Т-реклама', 'Шопинг', 'Конструктор сайтов', 'Селлер'],
    },
  ],
]

const compactColumns: ServiceGroup[][] = [
  [
    {
      title: 'Бухгалтерия',
      tone: 'gold',
      items: ['Бухгалтерия', 'Отчетность', 'Контрагенты'],
    },
    {
      title: 'Документы',
      tone: 'gold',
      items: ['Выписки', 'Справки', 'Счета-фактуры', 'Платежные требования', 'ЭДО', 'Транспортный ЭДО'],
    },
    {
      title: 'Электронные подписи',
      tone: 'gold',
      items: ['Электронные подписи', 'Настройка компьютера'],
    },
    {
      title: 'Работа с сотрудниками',
      tone: 'rose',
      items: ['Зарплатный проект', 'Выплаты самозанятым', 'Мгновенные выплаты', 'Подбор персонала', 'ESOP'],
    },
    {
      title: 'Анализ компании',
      tone: 'slate',
      items: ['Аналитика', 'Репутация', 'Отзывы'],
    },
    {
      title: 'Сервисы',
      tone: 'green',
      items: ['Кастодиальное обслуживание', 'Спецдепозитарий', 'Заказы в городе', 'Интеграции', 'Помощь'],
    },
    {
      title: 'Авто',
      tone: 'rose',
      items: ['Лизинг', 'Топливо', 'Штрафы', 'Страхование'],
    },
  ],
  [
    {
      title: 'Деньги',
      tone: 'teal',
      items: [
        'Счета и платежи',
        'Выставление счетов',
        'Бизнес-карта',
        'Брокерский счет',
        'ВЭД',
        'Безакцептные списания',
        'Инкассовые поручения',
        'Кэш-пулинг',
        'Финансовые инструменты',
      ],
    },
    {
      title: 'Финансирование',
      tone: 'green',
      items: ['Все кредиты', 'Оборотный кредит', 'Кредит на длительный срок', 'Овердрафт', 'Факторинг'],
    },
    {
      title: 'Прием платежей',
      tone: 'green',
      items: ['Торговый эквайринг', 'Интернет-эквайринг', 'Оплаты от\u00A0физлиц'],
    },
    {
      title: 'Оплата частями',
      tone: 'rose',
      items: ['Рассрочки', 'Долями'],
    },
    {
      title: 'Привлечение клиентов',
      tone: 'coral',
      items: ['Т-реклама', 'Шопинг', 'Конструктор сайтов', 'Селлер'],
    },
    {
      title: 'Работа с наличными',
      tone: 'teal',
      items: ['Доставка наличных', 'Самоинкассация'],
    },
    {
      title: 'Госзакупки',
      tone: 'brown',
      items: ['Мои госзакупки', 'Банковские гарантии'],
    },
    {
      title: 'Выгода от Т-Бизнеса',
      tone: 'orange',
      items: ['Партнерская программа', 'Приведи своих', 'Бонусы'],
    },
  ],
]

function ServiceColumns({ columns }: { columns: ServiceGroup[][] }) {
  return (
    <>
      {columns.map((column) => (
        <div key={column[0]?.title} className="all-services-column">
          {column.map((group) => (
            <section key={group.title} className="all-services-group" data-tone={group.tone}>
              <h2>{group.title}</h2>
              {group.items.map((item) => (
                <button key={item} type="button" className="all-services-item">
                  <span className="all-services-icon">
                    <IconSvg name="star" />
                  </span>
                  <span>{item}</span>
                </button>
              ))}
            </section>
          ))}
        </div>
      ))}
    </>
  )
}

export function AllServices() {
  const [rating, setRating] = useState(0)

  return (
    <div className="all-services">
      <div className="all-services-columns is-wide">
        <ServiceColumns columns={wideColumns} />
      </div>
      <div className="all-services-columns is-compact">
        <ServiceColumns columns={compactColumns} />
      </div>
      <section className="all-services-csat" aria-label="Как вам сервисы?">
        <h2>Как вам сервисы?</h2>
        <div className="all-services-rating">
          {[1, 2, 3].map((value) => (
            <button
              key={value}
              type="button"
              className={value <= rating ? 'is-on' : undefined}
              aria-label={`Оценка ${value}`}
              aria-pressed={value <= rating}
              onClick={() => setRating(value)}
            >
              <IconSvg name="star" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
