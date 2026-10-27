import { useState } from 'react'
import { SidebarLeft } from '../kit/components'
import { menuItems } from '../app/menu'
import { SidebarMenu } from '../app/SidebarMenu'

export function SidebarLeftDemo() {
  const [active, setActive] = useState('home')

  return (
    <div className="demo-sidebars-page">
      <div>
        <p className="demo-caption">Skeleton=False</p>
        <div className="demo-sidebars">
          <SidebarLeft>
            <SidebarMenu items={menuItems} active={active} onSelect={setActive} />
          </SidebarLeft>
          <div className="demo-sidebar-rail">
            <SidebarLeft minimize>
              <SidebarMenu items={menuItems} active={active} onSelect={setActive} />
            </SidebarLeft>
          </div>
        </div>
      </div>
      <div>
        <p className="demo-caption">Skeleton=True</p>
        <div className="demo-sidebars">
          <SidebarLeft skeleton />
          <div className="demo-sidebar-rail">
            <SidebarLeft minimize skeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
