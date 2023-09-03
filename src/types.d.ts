export interface APIResponse {
  feed: Feed
}

export interface Feed {
  entry: Podcast[]
}

export interface Author {
  name: Name
  uri: Uri
}

export interface Name {
  label: string
}

export interface Uri {
  label: string
}

export interface Podcast {
  'im:name': ImName
  'im:image': ImImage[]
  summary: Summary
  title: Title
  id: Id
  'im:artist': ImArtist
}

export interface PodcastViewModel {
  name: string
  image: string
  summary: string
  title: string
  id: string
  author: string
  episodes: Episode[]
}

export interface ImName {
  label: string
}

export interface ImImage {
  label: string
}

export interface Summary {
  label: string
}

export interface Title {
  label: string
}

export interface Id {
  attributes: Attributes
}

export interface Attributes {
  'im:id': string
}

export interface ImArtist {
  label: string
}

export interface Episodes {
  results: Episode[]
}

export interface Episode {
  wrapperType: string
  trackId: number
  artistName: string
  collectionName: string
  trackName: string
  releaseDate: string
  trackTimeMillis: number
  artworkUrl600: string
  episodeUrl?: string
  description?: string
}
