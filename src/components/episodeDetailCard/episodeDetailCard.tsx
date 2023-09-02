import { useLocation } from 'react-router-dom'
import { type Episode } from '../../types.d'
import './episodeDetailCard.css'

export const EpisodeDetailCard = (): JSX.Element => {
  const location = useLocation()
  const episode: Episode = location.state.episode

  return (
    <div className="episode-detail">
      <h2>{episode?.trackName}</h2>
      <p dangerouslySetInnerHTML={{ __html: episode?.description ?? '' }}/>
      <audio controls src={episode?.episodeUrl}></audio>
    </div>
  )
}
