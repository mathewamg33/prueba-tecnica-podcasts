import { render, screen } from '@testing-library/react'
import { EpisodesTable } from './episodesTable'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const mockPodcast = {
  name: 'Mock Podcast Name',
  image: 'podcast-image.jpg',
  summary: 'This is a mock podcast summary.',
  title: 'Mock Podcast Title',
  id: '12345',
  author: 'Mock Podcast Author',
  episodes: [
    {
      trackId: 1,
      trackName: 'Episode 1',
      releaseDate: '2023-09-01',
      trackTimeMillis: 3600000,
      wrapperType: 'podcastEpisode',
      collectionName: 'Mock Collection',
      artworkUrl600: 'artwork600.jpg',
      artistName: 'Artist',
    },
    {
      trackId: 2,
      trackName: 'Episode 2',
      releaseDate: '2023-09-02',
      trackTimeMillis: 1800000,
      wrapperType: 'podcastEpisode',
      collectionName: 'Mock Collection',
      artworkUrl600: 'artwork601.jpg',
      artistName: 'Artist 2',
    },
  ],
}

describe('EpisodesTable', () => {
  it('renders the table with episode data', () => {
    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route
            path="/podcast/:podcastId"
            element={<EpisodesTable isLoading={false} podcast={mockPodcast} />}
          ></Route>
        </Routes>
      </MemoryRouter>,
    )

    const table = screen.getByRole('table')
    expect(table).toBeTruthy()

    const episode1Title = screen.getByText('Episode 1')
    expect(episode1Title).toBeTruthy()
    const episode2Title = screen.getByText('Episode 2')
    expect(episode2Title).toBeTruthy()
  })

  it('renders a loading message when isLoading is true', () => {
    render(<EpisodesTable isLoading={true} podcast={mockPodcast} />)

    const loadingMessage = screen.getByText('Loading...')
    expect(loadingMessage).toBeTruthy()

    const table = screen.queryByRole('table')
    expect(table).not.toBeTruthy()
  })
})
