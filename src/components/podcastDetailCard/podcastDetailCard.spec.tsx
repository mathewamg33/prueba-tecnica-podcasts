import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PodcastDetailCard } from './podcastDetailCard'

const mockPodcastDetail = {
  id: '12345',
  name: 'Mock Podcast Name',
  image: 'test.jpg',
  title: 'Mock Podcast Title',
  author: 'Mock Podcast Author',
  summary: 'Mock Podcast Summary',
  episodes: [],
}

describe('PodcastDetailCard', () => {
  it('renders correctly with podcast detail', () => {
    render(
      <MemoryRouter>
        <PodcastDetailCard {...mockPodcastDetail} />
      </MemoryRouter>,
    )

    const podcastDetailElement = screen.getByTestId('podcast-detail')
    expect(podcastDetailElement).toBeTruthy()

    const podcastNameElement = screen.getByText('Mock Podcast Name')
    expect(podcastNameElement).toBeTruthy()

    const podcastAuthorElement = screen.getByText('by Mock Podcast Author')
    expect(podcastAuthorElement).toBeTruthy()

    const podcastSummaryElement = screen.getByText('Mock Podcast Summary')
    expect(podcastSummaryElement).toBeTruthy()

    const linkElement = screen.getByRole('link')
    expect(linkElement.getAttribute('href')).toBe('/podcast/12345')
  })
})
