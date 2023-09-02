import { Link } from 'react-router-dom'
import { formatDate, formatDuration } from '../../helpers'
import { type PodcastViewModel } from '../../types.d'
import './episodesTable.css'

interface Props {
  isLoading: boolean
  podcast: PodcastViewModel
}
export const EpisodesTable = (props: Props): JSX.Element => {
  const { isLoading, podcast } = props

  return !isLoading ? (
    <div className="column-right">
      <div className="episodes-counter">
        <span>Episodes {podcast?.episodes?.length}</span>
      </div>
      <table className="episodes-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {podcast?.episodes?.map((episode) => (
            <tr key={episode.trackId}>
              <td>
                <Link
                  to={`episode/${episode.trackId}`}
                  style={{ textDecoration: 'none' }}
                  state={{ episode }}
                >
                  {episode.trackName}
                </Link>
              </td>
              <td>{formatDate(episode.releaseDate)}</td>
              <td>{formatDuration(episode.trackTimeMillis)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <h1 style={{ margin: '25%', color: '#fff' }}>Loading...</h1>
  )
}
