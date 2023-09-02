import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'

import { EpisodesTable } from '../../components'
import { FETCH_PODCAST_CONTENT_MSG_ERROR } from '../../consts'
import { hasDayPassedSinceLastUpdate } from '../../helpers'
import { mapEpisodeAPIModelToPodcastViewModel } from '../../mappers'
import type { PodcastViewModel, Episodes } from '../../types.d'

import './podcastDetail.css'

export const PodcastDetail = (): JSX.Element => {
  const { podcastId, episodeId } = useParams()
  const location = useLocation()
  const podcast: PodcastViewModel = location.state?.podcast

  const [podcastDetail, setPodcastDetail] = useState<PodcastViewModel>(podcast)
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

  return (
    <div className="container">
      <div className="podcast-detail">
        <Link
          to={`/podcast/${podcastId}`}
          style={{ textDecoration: 'none', color: '#000' }}
          state={{ podcast: podcastDetail }}
        >
          <img src={podcastDetail?.image} alt={podcastDetail?.title} />
          <div className="divider"></div>
          <div className="podcast-content">
            <div className="podcast-detail-title">
              <strong>{podcastDetail?.name}</strong>
              <br />
              by {podcastDetail?.author}
            </div>
            <div className="divider"></div>
            <div className="podcast-description">
              <p>
                <strong>Description:</strong>
                <br />
                {podcastDetail?.summary}
              </p>
            </div>
          </div>
        </Link>
      </div>
      {episodeId != null ? (
        <Outlet />
      ) : (
        <EpisodesTable isLoading={isLoading} podcast={podcastDetail} />
      )}
    </div>
  )
}
