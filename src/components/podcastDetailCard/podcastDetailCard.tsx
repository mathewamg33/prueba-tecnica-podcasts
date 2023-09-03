import { Link } from 'react-router-dom'
import { type PodcastViewModel } from '../../types.d'

import './podcastDetailCard.css'

export const PodcastDetailCard = (
  podcastDetail: PodcastViewModel,
): JSX.Element => {
  return (
    <div className="podcast-detail" data-testid="podcast-detail">
      <Link
        to={`/podcast/${podcastDetail.id}`}
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
  )
}
