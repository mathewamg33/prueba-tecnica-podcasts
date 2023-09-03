import { PODCAST_EPISODE, PODCAST_TRACK } from '../consts'
import type { Episodes, Podcast, PodcastViewModel } from '../types.d'

export const mapPodcastAPIModelToViewModel = (
  podcasts: Podcast[],
): PodcastViewModel[] => {
  return podcasts.map((podcast: Podcast) => ({
    name: podcast['im:name'].label,
    image: podcast['im:image'][2].label,
    summary: podcast.summary.label,
    title: podcast.title.label,
    id: podcast.id.attributes['im:id'],
    author: podcast['im:artist'].label,
    episodes: [],
  }))
}

export const mapEpisodeAPIModelToPodcastViewModel = (
  episodes: Episodes,
  podcastDetail: PodcastViewModel
): PodcastViewModel => {
  const tempPodcast = episodes.results.filter(
    (episode) => episode.wrapperType === PODCAST_TRACK,
  )[0]

  return {
    ...podcastDetail,
    title: tempPodcast?.collectionName,
    image: tempPodcast?.artworkUrl600,
    name: tempPodcast?.trackName,
    author: tempPodcast?.artistName,
    episodes: episodes.results.filter(
      (episode) => episode.wrapperType === PODCAST_EPISODE,
    ),
  }
}
