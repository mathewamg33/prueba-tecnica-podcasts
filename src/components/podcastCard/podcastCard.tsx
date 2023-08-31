import { Link } from 'react-router-dom'
import { type Podcast } from '../../types.d'

import './podcastCard.css'

export const PodcastCard = (podcast: Podcast): JSX.Element => {
  return (
    <div className="card">
      <Link
        to={'/podcast/' + podcast.id.attributes['im:id']}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <img src={podcast['im:image'][2].label} alt={podcast.title.label} />
        <div className="card-content">
          <h2 className="card-title">{podcast['im:name'].label}</h2>
          <p className="card-author">Author: {podcast['im:artist'].label}</p>
        </div>
      </Link>
    </div>
  )
}
