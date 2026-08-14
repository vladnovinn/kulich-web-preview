import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { catalog, groupCatalogByCategory } from '../catalog/registry'

export function Sidebar() {
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const filtered = normalized
      ? catalog.filter((entry) => {
          const haystack = `${entry.name} ${entry.category} ${entry.description}`.toLowerCase()
          return haystack.includes(normalized)
        })
      : catalog

    return groupCatalogByCategory(filtered)
  }, [query])

  const showIcons =
    !query.trim() ||
    'иконки icons icon foundation'.includes(query.trim().toLowerCase())

  const showApp =
    !query.trim() ||
    'приложение app frontend фронтенд'.includes(query.trim().toLowerCase())

  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand" end>
        <span className="brand-mark" aria-hidden>
          K
        </span>
        <span className="brand-text">
          <span className="brand-name">Kulich</span>
          <span className="brand-tag">Component preview</span>
        </span>
      </NavLink>

      <label className="sidebar-search">
        <span className="visually-hidden">Поиск</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти"
          autoComplete="off"
        />
      </label>

      <nav className="sidebar-nav" aria-label="Каталог">
        {showApp ? (
          <section className="nav-group">
            <h2>Приложение</h2>
            <ul>
              <li>
                <a
                  className="nav-launch"
                  href="/app"
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть приложение
                </a>
              </li>
            </ul>
          </section>
        ) : null}

        {showIcons ? (
          <section className="nav-group">
            <h2>Foundation</h2>
            <ul>
              <li>
                <NavLink to="/icons">Иконки</NavLink>
              </li>
            </ul>
          </section>
        ) : null}

        {groups.length === 0 && query && !showIcons && !showApp ? (
          <p className="sidebar-empty">Ничего не найдено</p>
        ) : null}

        {groups.length === 0 && !query ? (
          <p className="sidebar-empty">
            Компонентов пока нет. Добавьте запись в catalog/registry.ts
          </p>
        ) : null}

        {groups.map((group) => (
          <section key={group.category} className="nav-group">
            <h2>{group.category}</h2>
            <ul>
              {group.items.map((entry) => (
                <li key={entry.slug}>
                  <NavLink to={`/components/${entry.slug}`}>
                    {entry.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  )
}
