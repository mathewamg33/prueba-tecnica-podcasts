import { useEffect, useState } from 'react'
import { FETCH_PODCAST_CONTENT_MSG_ERROR } from '../consts'
import { hasDayPassedSinceLastUpdate } from '../helpers'
import { mapEpisodeAPIModelToPodcastViewModel } from '../mappers'
import type { PodcastViewModel, Episodes } from '../types.d'
import { useLocation } from 'react-router-dom'

export const usePodcastDetail = (
  podcastId?: string,
): { podcastDetail: PodcastViewModel; isLoading: boolean } => {
  const location = useLocation()
  const podcast: PodcastViewModel = location.state?.podcast
  const [podcastDetail, setPodcastDetail] = useState<PodcastViewModel>({
    ...podcast,
    id: podcastId ?? podcast.id,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const podcastKeyLocalStorage = `podcast${podcastId}`

  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
  )}`

  const fetchPodcastDetail = (): void => {
    if (hasDayPassedSinceLastUpdate(podcastKeyLocalStorage)) {
      setIsLoading(true)
      fetch(url)
        .then(async (response) => await response.json())
        .then((responseEpisodes: Episodes) => {
          const tempPodcastDetail = mapEpisodeAPIModelToPodcastViewModel(
            responseEpisodes,
            podcastDetail,
          )
          setPodcastDetail(tempPodcastDetail)
          window.localStorage.setItem(
            podcastKeyLocalStorage,
            JSON.stringify({
              value: tempPodcastDetail,
              timestamp: new Date().getTime(),
            }),
          )
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(FETCH_PODCAST_CONTENT_MSG_ERROR, error)
          setIsLoading(false)
        })
    } else {
      setPodcastDetail(
        JSON.parse(
          window.localStorage.getItem(podcastKeyLocalStorage) as string,
        ).value,
      )
    }
  }

  useEffect(() => {
    fetchPodcastDetail()
  }, [])

  return { podcastDetail, isLoading }
}
