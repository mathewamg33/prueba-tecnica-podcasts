import { Outlet, useParams } from 'react-router-dom'
import { PodcastDetailCard, EpisodesTable } from '../../components'
import { usePodcastDetail } from '../../hooks'

import './podcastDetail.css'

export const PodcastDetail = (): JSX.Element => {
  const { podcastId, episodeId } = useParams()
  const { podcastDetail, isLoading } = usePodcastDetail(podcastId)

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
