import { Link, useParams } from 'react-router-dom'
import { getCatalogEntry } from '../catalog/registry'
import { DemoStage } from '../layout/DemoStage'

const statusLabel = {
  draft: 'Черновик',
  stable: 'Стабильный',
  deprecated: 'Устарел',
} as const

export function ComponentPage() {
  const { slug } = useParams()
  const entry = slug ? getCatalogEntry(slug) : undefined

  if (!entry) {
    return (
      <article className="page">
        <header className="page-header">
          <p className="eyebrow">Не найдено</p>
          <h1>Компонент отсутствует</h1>
          <p className="lede">
            В каталоге нет записи со слагом «{slug}». Проверьте реестр или
            вернитесь на обзор.
          </p>
          <Link to="/" className="text-link">
            На главную
          </Link>
        </header>
      </article>
    )
  }

  const Demo = entry.Demo
  const fill = entry.layout === 'fill'

  return (
    <article className={fill ? 'page page-wide' : 'page'}>
      <header className="page-header">
        <p className="eyebrow">{entry.category}</p>
        <div className="page-title-row">
          <h1>{entry.name}</h1>
          <span className={`status status-${entry.status}`}>
            {statusLabel[entry.status]}
          </span>
        </div>
        <p className="lede">{entry.description}</p>
      </header>

      <DemoStage fill={fill}>
        <Demo />
      </DemoStage>
    </article>
  )
}
