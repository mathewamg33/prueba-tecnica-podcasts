import {
  mapEpisodeAPIModelToPodcastViewModel,
  mapPodcastAPIModelToViewModel,
} from './podcast.mapper'

const samplePodcasts = [
  {
    'im:name': { label: 'Podcast 1' },
    'im:image': [
      { label: 'image_url_0' },
      { label: 'image_url_1' },
      { label: 'image_url_2' },
    ],
    summary: { label: 'Summary 1' },
    title: { label: 'Title 1' },
    id: { attributes: { 'im:id': '1' } },
    'im:artist': { label: 'Author 1' },
  },
]

describe('mapPodcastAPIModelToViewModel', () => {
  it('Should correctly map podcast data', () => {
    const mappedPodcasts = mapPodcastAPIModelToViewModel(samplePodcasts)

    expect(mappedPodcasts).toHaveLength(samplePodcasts.length)

    mappedPodcasts.forEach((podcast, index) => {
      const samplePodcast = samplePodcasts[index]

      expect(podcast.name).toBe(samplePodcast['im:name'].label)
      expect(podcast.image).toBe(samplePodcast['im:image'][2].label)
      expect(podcast.summary).toBe(samplePodcast.summary.label)
      expect(podcast.title).toBe(samplePodcast.title.label)
      expect(podcast.id).toBe(samplePodcast.id.attributes['im:id'])
      expect(podcast.author).toBe(samplePodcast['im:artist'].label)
      expect(podcast.episodes).toEqual([])
    })
  })
})

const sampleEpisodes = {
  results: [
    {
      wrapperType: 'track',
      collectionName: 'Podcast Title',
      artworkUrl600: 'image_url',
      trackName: 'podcast_name',
      artistName: 'Podcast Author',
      trackId: 1564,
      releaseDate: 'releaseDate',
      trackTimeMillis: 123545,
    },
    {
      wrapperType: 'podcastEpisode',
      collectionName: 'Episode Title',
      artworkUrl600: 'image_url',
      trackName: 'Episode Name',
      artistName: 'Episode Author',
      trackId: 1564,
      releaseDate: 'releaseDate',
      trackTimeMillis: 123545,
    },
  ],
}

const samplePodcastDetail = {
  name: 'Podcast Name',
  image: 'Podcast Image',
  summary: 'Podcast Summary',
  title: 'Podcast Title',
  id: 'Podcast ID',
  author: 'Podcast Author',
  episodes: [],
}

describe('mapEpisodeAPIModelToPodcastViewModel', () => {
  it('Should correctly map episode data to PodcastViewModel', () => {
    const mappedPodcast = mapEpisodeAPIModelToPodcastViewModel(
      sampleEpisodes,
      samplePodcastDetail,
    )

    expect(mappedPodcast.name).toBe(sampleEpisodes.results[0]?.trackName)
    expect(mappedPodcast.image).toBe(sampleEpisodes.results[0]?.artworkUrl600)
    expect(mappedPodcast.summary).toBe(samplePodcastDetail.summary)
    expect(mappedPodcast.title).toBe(sampleEpisodes.results[0]?.collectionName)
    expect(mappedPodcast.id).toBe(samplePodcastDetail.id)
    expect(mappedPodcast.author).toBe(sampleEpisodes.results[0]?.artistName)
    expect(mappedPodcast.episodes).toEqual([sampleEpisodes.results[1]])
  })
})
