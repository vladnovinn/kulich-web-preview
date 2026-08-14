import type { ReactNode } from 'react'

type DemoStageProps = {
  children: ReactNode
  fill?: boolean
}

export function DemoStage({ children, fill }: DemoStageProps) {
  return (
    <section className="demo-stage" aria-label="Демонстрация">
      <div className="demo-stage-bar">
        <span>Preview</span>
      </div>
      <div className={fill ? 'demo-stage-body is-fill' : 'demo-stage-body'}>
        {children}
      </div>
    </section>
  )
}
