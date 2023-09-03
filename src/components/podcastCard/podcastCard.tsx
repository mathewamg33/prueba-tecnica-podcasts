import { useNavigate } from 'react-router-dom'
import { type PodcastViewModel } from '../../types.d'

import './podcastCard.css'

export const PodcastCard = (podcast: PodcastViewModel): JSX.Element => {
  const navigate = useNavigate()

  const handleClickCard = (): void => {
    navigate(`/podcast/${podcast.id}`, { state: { podcast } })
  }

  return (
    <div data-testid="podcast-card" className="card" onClick={handleClickCard}>
      <img src={podcast.image} alt={podcast.title} />
      <div className="card-content">
        <h2 className="card-title">{podcast.name}</h2>
        <p className="card-author">Author: {podcast.author}</p>
      </div>
    </div>
  )
}
