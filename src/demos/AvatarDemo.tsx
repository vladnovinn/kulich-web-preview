import { icons } from '../icons/registry'
import { Avatar } from '../kit/components'

export function AvatarDemo() {
  return (
    <div className="demo-stack demo-stack-wide">
      <p className="demo-caption">State</p>
      <div className="demo-row demo-row-avatar">
        <Avatar state="selected" icon="home" />
        <Avatar state="normal" icon="home" />
        <Avatar state="hover" icon="home" />
      </div>

      <p className="demo-caption">Иконки из каталога</p>
      <div className="demo-row demo-row-avatar">
        {icons.map((icon) => (
          <Avatar key={icon.id} state="selected" icon={icon.id} />
        ))}
      </div>
    </div>
  )
}
