import {
  Badge,
  Button,
  Header,
  headerBadgeSize,
  headerButtonSize,
  type HeaderSize,
} from '../kit/components'

const sizes: HeaderSize[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body-l',
  'body-m',
  'body-s',
]

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."

export function HeaderDemo() {
  return (
    <div className="demo-header-page">
      {sizes.map((size) => (
        <Header
          key={size}
          size={size}
          title="Title"
          subtitle="Subtitle"
          description={description}
          accessories={
            <>
              <Badge size={headerBadgeSize(size)}>1</Badge>
              <Button size={headerButtonSize(size)}>Button</Button>
            </>
          }
        />
      ))}
    </div>
  )
}
