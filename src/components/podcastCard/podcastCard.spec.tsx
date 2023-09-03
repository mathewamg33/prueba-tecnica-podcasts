import { render, screen, fireEvent } from '@testing-library/react'
import { PodcastCard } from './podcastCard'
import { MemoryRouter } from 'react-router-dom'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

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

describe('PodcastCard', () => {
  it('renders correctly with podcast data', () => {
    render(
      <MemoryRouter>
        <PodcastCard {...mockPodcast} />
      </MemoryRouter>,
    )

    const cardElement = screen.getByTestId('podcast-card')
    expect(cardElement).toBeTruthy()

    const podcastNameElement = screen.getByText('Mock Podcast Name')
    expect(podcastNameElement).toBeTruthy()
    const podcastAuthorElement = screen.getByText('Author: Mock Podcast Author')
    expect(podcastAuthorElement).toBeTruthy()
  })

  it('navigates to the podcast detail page when clicked', () => {
    render(
      <MemoryRouter>
        <PodcastCard {...mockPodcast} />
      </MemoryRouter>,
    )

    const cardElement = screen.getByTestId('podcast-card')
    fireEvent.click(cardElement)

    expect(mockNavigate).toHaveBeenCalledWith('/podcast/12345', {
      state: { podcast: mockPodcast },
    })
  })
})
