export function OverviewPage() {
  return (
    <article className="page">
      <header className="page-header">
        <p className="eyebrow">Галерея</p>
        <h1>Площадка для компонентов</h1>
        <p className="lede">
          Живые примеры UI-библиотеки Kulich. Выберите компонент в боковой
          панели, откройте набор иконок или{' '}
          <a className="text-link" href="/app" target="_blank" rel="noreferrer">
            приложение
          </a>
          .
        </p>
      </header>

      <section className="howto">
        <h2>Как добавить компонент</h2>
        <ol>
          <li>
            Создайте демо в <code>src/demos</code>
          </li>
          <li>
            Зарегистрируйте его в <code>src/catalog/registry.ts</code>
          </li>
          <li>Страница и пункт в сайдбаре появятся сами</li>
        </ol>

        <pre className="code-sample">
          <code>{`{
  slug: 'button',
  name: 'Button',
  category: 'Actions',
  description: 'Основная кнопка действия',
  status: 'draft',
  Demo: ButtonDemo,
}`}</code>
        </pre>
      </section>
    </article>
  )
}
