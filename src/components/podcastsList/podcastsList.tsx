import { useState } from 'react'
import { type Podcast } from '../../types'
import { PodcastCard } from '../podcastCard'
import './podcastsList.css'

interface Props {
  podcasts: Podcast[]
}

export const PodcastsList = (props: Props): JSX.Element => {
  const [filterPodcast, setFilterPodcast] = useState<string | null>(null)

  const filteredPodcasts = (): Podcast[] => {
    return filterPodcast != null && filterPodcast.length > 0
      ? props.podcasts.filter(
        (podcast) =>
          podcast['im:name'].label
            .toLowerCase()
            .includes(filterPodcast.toLowerCase()) ||
          podcast['im:artist'].label
            .toLowerCase()
            .includes(filterPodcast.toLowerCase()),
      )
      : props.podcasts
  }

  const handleFilterPodcast = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFilterPodcast(e.target.value)
  }

  return (
    <>
      <div className="wrapper">
        <span className="counter">{filteredPodcasts().length}</span>
        <input placeholder="Filter podcasts..." onChange={handleFilterPodcast} />
      </div>
      <div className="podcasts">
        {filteredPodcasts().map((podcast) => (
          <PodcastCard key={podcast.id.label} {...podcast}></PodcastCard>
        ))}
      </div>
    </>
  )
}
