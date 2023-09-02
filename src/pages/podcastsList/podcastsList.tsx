import { useEffect, useState } from 'react'
import type { APIResponse, PodcastViewModel } from '../../types.d'
import { PodcastCard } from '../../components'
import './podcastsList.css'
import { hasDayPassedSinceLastUpdate } from '../../helpers'
import { mapPodcastAPIModelToViewModel } from '../../mappers'
import { FETCH_PODCASTS_MSG_ERROR } from '../../consts'

interface Props {
  onIsLoadingPodcasts: (isLoading: boolean) => void
}

export const PodcastsList = (props: Props): JSX.Element => {
  const [podcasts, setPodcasts] = useState<PodcastViewModel[]>([])
  const [filterPodcasts, setFilterPodcasts] = useState<string | null>(null)

  const podcastsKeyLocalStorage = 'podcasts'

  const fetchPodcasts = (): void => {
    if (hasDayPassedSinceLastUpdate(podcastsKeyLocalStorage)) {
      props.onIsLoadingPodcasts(true)
      fetch(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
      )
        .then(async (response) => await response.json())
        .then((responsePodcasts: APIResponse) => {
          const allPodcasts = mapPodcastAPIModelToViewModel(
            responsePodcasts.feed.entry,
          )
          setPodcasts(allPodcasts)
          window.localStorage.setItem(
            podcastsKeyLocalStorage,
            JSON.stringify({
              value: allPodcasts,
              timestamp: new Date().getTime(),
            }),
          )
          props.onIsLoadingPodcasts(false)
        })
        .catch((error) => {
          console.error(FETCH_PODCASTS_MSG_ERROR, error)
          props.onIsLoadingPodcasts(false)
        })
    } else {
      setPodcasts(
        JSON.parse(
          window.localStorage.getItem(podcastsKeyLocalStorage) as string,
        ).value,
      )
    }
  }

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const filteredPodcasts = (): PodcastViewModel[] => {
    return filterPodcasts != null && filterPodcasts.length > 0
      ? podcasts.filter(
        (podcast) =>
          podcast.name.toLowerCase().includes(filterPodcasts.toLowerCase()) ||
          podcast.author.toLowerCase().includes(filterPodcasts.toLowerCase()),
      )
      : podcasts
  }

  const handleFilterPodcast = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFilterPodcasts(e.target.value)
  }

  return (
    <>
      <div className="wrapper">
        <span className="counter">{filteredPodcasts().length}</span>
        <input
          placeholder="Filter podcasts..."
          onChange={handleFilterPodcast}
        />
      </div>
      <div className="podcasts">
        {filteredPodcasts().map((podcast) => (
          <PodcastCard key={podcast.id} {...podcast}></PodcastCard>
        ))}
      </div>
    </>
  )
}
