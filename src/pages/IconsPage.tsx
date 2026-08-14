import { useMemo, useState } from 'react'
import { icons } from '../icons/registry'

const FIGMA_SOURCE =
  'https://www.figma.com/design/t0D4SXOgYo0ty4LtB6uzg7/Untitled?node-id=1-53'

export function IconsPage() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return icons.filter((icon) =>
      normalized ? `${icon.name} ${icon.id}`.toLowerCase().includes(normalized) : true,
    )
  }, [query])

  async function copyId(id: string) {
    await navigator.clipboard.writeText(id)
    setCopied(id)
    window.setTimeout(() => setCopied(null), 1200)
  }

  return (
    <article className="page page-wide">
      <header className="page-header">
        <p className="eyebrow">Foundation</p>
        <h1>Иконки</h1>
        <p className="lede">
          {icons.length} иконок tui-ic-medium из{' '}
          <a className="text-link" href={FIGMA_SOURCE} target="_blank" rel="noreferrer">
            Figma
          </a>
          . SVG лежат в <code>public/icons</code>.
        </p>
      </header>

      <div className="icon-toolbar">
        <label className="icon-search">
          <span className="visually-hidden">Поиск иконок</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти иконку"
            autoComplete="off"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="icon-empty-inline">Ничего не найдено</p>
      ) : (
        <ul className="icon-grid">
          {filtered.map((icon) => (
            <li key={icon.id}>
              <button
                type="button"
                className="icon-card"
                onClick={() => copyId(icon.id)}
              >
                <div className="icon-card-glyph">
                  <img src={icon.src} alt="" width={24} height={24} />
                </div>
                <p className="icon-card-name">{icon.name}</p>
                <p className="icon-card-meta">
                  {copied === icon.id ? 'Скопировано' : icon.id}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
