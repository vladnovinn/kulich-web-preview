import { SidebarRight } from '../kit/components'

export function SidebarRightDemo() {
  return (
    <div className="demo-sidebars-page">
      <div>
        <p className="demo-caption">Skeleton=False</p>
        <div className="demo-sidebars">
          <div>
            <p className="demo-caption">Barbie</p>
            <SidebarRight minimize />
          </div>
          <div>
            <p className="demo-caption">Full Size</p>
            <SidebarRight />
          </div>
        </div>
      </div>
      <div>
        <p className="demo-caption">Skeleton=True</p>
        <div className="demo-sidebars">
          <div>
            <p className="demo-caption">Barbie</p>
            <SidebarRight minimize skeleton />
          </div>
          <div>
            <p className="demo-caption">Full Size</p>
            <SidebarRight skeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
