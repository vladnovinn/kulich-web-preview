import { useState } from 'react'
import { IconSvg } from '../icons/inline'
import {
  Badge,
  Button,
  CardAvatar,
  CardHeading,
  CardLarge,
  CardMedium,
  CardRow,
} from '../kit/components'

const cells = [0, 1, 2]
const longTitle =
  'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
const longDescription =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

function LabelButton() {
  return (
    <Button appearance="secondary" size="m">
      Label
    </Button>
  )
}

function Chevron() {
  return <IconSvg name="chevron-down" className="kit-card-row-chevron" />
}

function CloseButton({ label = 'Close', onClick }: { label?: string; onClick?: () => void }) {
  return (
    <button type="button" className="kit-card-close" aria-label={label} onClick={onClick}>
      <IconSvg name="cross" />
    </button>
  )
}

function PortalCard() {
  const [open, setOpen] = useState(true)
  const [step, setStep] = useState<1 | 2>(1)
  const [rating, setRating] = useState(0)

  if (!open) {
    return (
      <Button
        appearance="primary"
        size="m"
        onClick={() => {
          setStep(1)
          setOpen(true)
        }}
      >
        Show popover
      </Button>
    )
  }

  return (
    <CardLarge space="compact" className="demo-card-popover">
      <CloseButton onClick={() => setOpen(false)} />
      {step === 1 ? (
        <>
          <CardHeading title="Leave your feedback" subtitle="It will only take 3 minutes" />
          <div className="kit-card-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`kit-card-star${value <= rating ? ' is-on' : ''}`}
                aria-label={`${value}`}
                onClick={() => setRating(value)}
              >
                <IconSvg name="star" />
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <CardHeading title="Why so?" />
          <textarea className="kit-card-note" rows={3} placeholder="Leave a few words" />
        </>
      )}
      <footer className="demo-card-actions">
        {step === 2 ? (
          <Button appearance="secondary" size="s" onClick={() => setStep(1)}>
            Back
          </Button>
        ) : null}
        <Button
          appearance="primary"
          size="s"
          onClick={() => (step === 1 ? setStep(2) : setOpen(false))}
        >
          {step === 1 ? 'Next' : 'Submit'}
        </Button>
      </footer>
    </CardLarge>
  )
}

export function CardLargeDemo() {
  return (
    <div className="demo-card-page">
      <section className="demo-card-group">
        <p className="demo-caption">Basic · Desktop</p>
        <CardLarge>
          <CardHeading title="Header" />
          <div className="kit-card-placeholder">Replace me</div>
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
        <CardLarge>
          <CardHeading
            title="Header"
            accessories={<Badge size="xl">Like</Badge>}
          />
          <div className="kit-card-placeholder">Replace me</div>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Basic · iOS/Android</p>
        <CardLarge platform="ios">
          <CardHeading title="Header" accessories={<button type="button" className="kit-card-link">Label</button>} />
          <div className="kit-card-placeholder">Replace me</div>
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
        <CardLarge platform="ios">
          <CardHeading title="Header" accessories={<button type="button" className="kit-card-link">Label</button>} />
          <div className="kit-card-placeholder">Replace me</div>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Avatar</p>
        <CardLarge>
          <CardHeading title="Title" subtitle="Subtitle" accessories={<CardAvatar />} />
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
        <CardLarge platform="ios">
          <CardHeading title="Title" subtitle="Subtitle" accessories={<CardAvatar />} />
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Single item</p>
        <CardLarge as="button">
          <CardHeading title="Title" subtitle="Subtitle" accessories={<CardAvatar />} />
        </CardLarge>
        <CardLarge as="button">
          <CardRow title="Title" description="Description" />
        </CardLarge>
        <div className="demo-card-row">
          <CardLarge as="button">
            <CardHeading title="Title" accessories={<span className="kit-card-icon"><IconSvg name="star" /></span>} />
          </CardLarge>
          <CardLarge as="button">
            <CardHeading title="Title" accessories={<span className="kit-card-icon"><IconSvg name="star" /></span>} />
          </CardLarge>
        </div>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Cards list</p>
        <CardLarge>
          <CardHeading title="Title" subtitle="Subtitle" />
          <div className="demo-card-scroll">
            {cells.map((item) => (
              <CardMedium key={item} title="Title" subtitle="Subtitle" />
            ))}
          </div>
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Cell list</p>
        <CardLarge>
          <CardHeading title="Title" subtitle="Subtitle" />
          {cells.map((item) => (
            <CardRow key={item} title="Title" description="Description" />
          ))}
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
      </section>

      <section className="demo-card-group is-wide">
        <p className="demo-caption">Cell list · 2 columns</p>
        <CardLarge>
          <CardHeading title="Title" subtitle="Subtitle" />
          <div className="demo-card-row">
            {Array.from({ length: 6 }, (_, item) => (
              <CardRow key={item} title="Title" description="Description" />
            ))}
          </div>
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Cell list · actions</p>
        <CardLarge>
          <CardHeading title="Title" subtitle="Subtitle" />
          {cells.map((item) => (
            <CardRow key={item} as="button" title="Title" description="Description" accessory={<Chevron />} />
          ))}
          <button type="button" className="kit-card-link">
            Show all
          </button>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Cell list · headless</p>
        <CardLarge>
          {cells.map((item) => (
            <CardRow key={item} title="Title" description="Description" />
          ))}
        </CardLarge>
        <CardLarge>
          <CardRow title="Title" description="Description" />
          <LabelButton />
        </CardLarge>
      </section>

      <section className="demo-card-group is-wide">
        <p className="demo-caption">Footer alignment</p>
        <div className="demo-card-footer-grid">
          <CardLarge>
            <CardHeading title="Title" />
            <CardRow title="Title" description="Description" />
            <footer>
              <LabelButton />
            </footer>
          </CardLarge>
          <CardLarge>
            <CardHeading title="Title" />
            <p>Some text</p>
            <footer>
              <LabelButton />
            </footer>
          </CardLarge>
          <CardLarge>
            <CardHeading
              title="Card with text content"
              accessories={<span className="kit-card-icon"><IconSvg name="star" /></span>}
            />
            <p>
              Use description for text content of a card with spacings according to the specs.
            </p>
            <footer className="kit-card-progress">
              <span>Remaining $25 120.23</span>
              <span className="kit-card-progress-track">
                <span className="kit-card-progress-value" />
              </span>
              <span>out of $100 000</span>
            </footer>
          </CardLarge>
        </div>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Image</p>
        <CardLarge className="kit-card-image">
          <CardHeading title="Title" subtitle="Subtitle" accessories={<CloseButton />} />
        </CardLarge>
        <CardLarge className="kit-card-image kit-card-image-dark">
          <CardHeading title="Title" subtitle="Subtitle" accessories={<CloseButton />} />
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Cell with close</p>
        <CardLarge space="compact" platform="ios">
          <CardRow
            title={<span className="kit-card-fade">{longTitle}</span>}
            description={<span className="kit-card-fade kit-card-fade-sub">{longDescription}</span>}
            accessory={<CloseButton />}
          />
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Paddings and radii · Desktop</p>
        <CardLarge>
          <CardHeading title="Normal" subtitle="Radius: 24, padding: 24" />
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
        <CardLarge space="compact">
          <CardHeading title="Compact" subtitle="Radius: 16, padding: 20" />
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Paddings and radii · iOS/Android</p>
        <CardLarge platform="ios">
          <CardHeading title="Normal" subtitle="Radius: 24, padding: 20" />
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
        <CardLarge space="compact" platform="ios">
          <CardHeading title="Compact" subtitle="Radius: 16, padding: 16" />
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">Map</p>
        <CardLarge>
          <CardHeading title="Title" subtitle="Subtitle" />
          <div className="kit-card-map" role="img" aria-label="Карта" />
          <footer>
            <LabelButton />
          </footer>
        </CardLarge>
      </section>

      <section className="demo-card-group">
        <p className="demo-caption">In portal</p>
        <PortalCard />
      </section>
    </div>
  )
}
