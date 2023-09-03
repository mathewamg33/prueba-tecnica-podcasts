import { useLocation, useParams } from 'react-router-dom'
import type { PodcastViewModel, Episode } from '../../types.d'
import './episodeDetailCard.css'
import { useEffect, useState } from 'react'

export const EpisodeDetailCard = (): JSX.Element => {
  const { podcastId, episodeId } = useParams()
  const location = useLocation()
  const [episode, setEpisode] = useState<Episode>(location.state?.episode)

  const podcastKeyLocalStorage = `podcast${podcastId}`

  const getEpisode = (): void => {
    const podcast: PodcastViewModel = JSON.parse(
      window.localStorage.getItem(podcastKeyLocalStorage) as string,
    )?.value

    const currentEpisode = podcast?.episodes.find(
      (episode) => episode.trackId === Number(episodeId),
    )

    setEpisode(currentEpisode as Episode)
  }

  useEffect(() => {
    if (location.state?.episode == null) {
      getEpisode()
    }
  }, [])

  return episode != null ? (
    <div className="episode-detail">
      <h2>{episode?.trackName}</h2>
      <p dangerouslySetInnerHTML={{ __html: episode?.description ?? '' }} />
      <audio data-testid="episode-audio" controls src={episode?.episodeUrl}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  ) : (
    <h1 style={{ margin: '25%', color: '#fff' }}>Episode Not Found</h1>
  )
}
