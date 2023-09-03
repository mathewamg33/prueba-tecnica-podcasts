import { Link, Route, Routes } from 'react-router-dom'
import { PodcastDetail, PodcastsList } from './pages'
import './App.css'
import { useState } from 'react'
import { EpisodeDetailCard } from './components'

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleIsLoadingPodcasts = (isLoading: boolean): void => {
    setIsLoading(isLoading)
  }

  return (
    <>
      <header>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
          <h1 className="title">Podcaster</h1>
        </Link>
        {isLoading && (
          <div className="loading-icon">
            <i className="fas fa-spinner"></i>
          </div>
        )}
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <PodcastsList onIsLoadingPodcasts={handleIsLoadingPodcasts} />
          }
        />
        <Route path="/podcast/:podcastId" element={<PodcastDetail />}>
          <Route path="episode/:episodeId" element={<EpisodeDetailCard />} />
        </Route>
        <Route
          path="*"
          element={<h1 style={{ color: '#fff', marginTop: '10%' }}>Not Found</h1>}
        />
      </Routes>
    </>
  )
}

export default App
