export interface Project {
  id: string
  title: string
  shortDescription: string
  description: string
  thumbnail: string
  mainImage?: string
  gallery?: string[]
  client: string
  location: string
  year: string
  type: string
  architect?: string
  features?: string[]
}
