import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { type APIResponse, type Podcast } from './types.d'
import { PodcastsList } from './components/podcastsList/podcastsList'

const PodcastView = (): JSX.Element => <h1>estoy aqui</h1>
const Episode = (): JSX.Element => <h1>Episode</h1>

function App(): JSX.Element {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [lastCallDate, setLastCallDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchPodcasts = (): void => {
    const currentDate = new Date()

    // If lastCallDate is null or a day has passed since the last call
    if (
      lastCallDate === null ||
      currentDate.getTime() - lastCallDate.getTime() >= 24 * 60 * 60 * 1000
    ) {
      setIsLoading(true)
      fetch(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
      )
        .then(async (response) => await response.json())
        .then((responsePodcasts: APIResponse) => {
          setPodcasts(responsePodcasts.feed.entry)
          setLastCallDate(currentDate)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching podcasts:', error)
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    fetchPodcasts()
  }, [lastCallDate])

  return (
    <>
      <header>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
          <h1 className="title">Podcaster</h1>
          {isLoading && (
            <div className="loading-icon">
              <i className="fas fa-spinner"></i>
            </div>
          )}
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<PodcastsList podcasts={podcasts} />} />
        <Route path="/podcast/:podcastId" element={<PodcastView />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<Episode />}
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
