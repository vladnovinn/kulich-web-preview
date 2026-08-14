import type { ComponentType } from 'react'

export type ComponentStatus = 'draft' | 'stable' | 'deprecated'
export type CatalogLayout = 'centered' | 'fill'

export type CatalogEntry = {
  slug: string
  name: string
  category: string
  description: string
  status: ComponentStatus
  layout?: CatalogLayout
  Demo: ComponentType
}
