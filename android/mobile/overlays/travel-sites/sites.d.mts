export type TravelCategory = 'flights' | 'stays' | 'volunteering'
export type TravelSiteFilter = 'all' | TravelCategory
export interface TravelSiteCopy {
  title: string
  category: string
  description: string
  detail: string
}
export interface TravelSite {
  readonly id: string
  readonly category: TravelCategory
  readonly url: string
  readonly model: string
  readonly fa: TravelSiteCopy
  readonly en: TravelSiteCopy
}
export const TRAVEL_SITES: readonly TravelSite[]
export const SITE_FILTERS: readonly TravelSiteFilter[]
export function listTravelSites(options?: { category?: TravelSiteFilter; query?: string; locale?: string }): TravelSite[]
