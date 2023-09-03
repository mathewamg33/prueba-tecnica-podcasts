import { useEffect, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'

import { PodcastDetailCard, EpisodesTable } from '../../components'
import { FETCH_PODCAST_CONTENT_MSG_ERROR } from '../../consts'
import { hasDayPassedSinceLastUpdate } from '../../helpers'
import { mapEpisodeAPIModelToPodcastViewModel } from '../../mappers'
import type { PodcastViewModel, Episodes } from '../../types.d'

import './podcastDetail.css'

export const PodcastDetail = (): JSX.Element => {
  const { podcastId, episodeId } = useParams()
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

  return podcastDetail.name != null ? (
    <div className="container">
      <PodcastDetailCard {...podcastDetail} />
      {episodeId != null ? (
        <Outlet />
      ) : (
        <EpisodesTable isLoading={isLoading} podcast={podcastDetail} />
      )}
    </div>
  ) : (
    <h1 style={{ margin: '20%', color: '#fff' }}>Podcast Not Found</h1>
  )
}
