import { render, screen } from '@testing-library/react'
import { EpisodeDetailCard } from './episodeDetailCard'

const mockEpisode = {
  trackName: 'Episode Title',
  description: 'Episode Description',
  episodeUrl: 'test.mp3',
}

const mockLocation = {
  pathname: '/episode/1',
  state: { episode: mockEpisode },
}

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
}))

describe('EpisodeDetailCard', () => {
  it('should render episode details', () => {
    const { getByText } = render(<EpisodeDetailCard />)

    expect(getByText('Episode Title')).toBeTruthy()
    expect(getByText('Episode Description')).toBeTruthy()
    const audioElement = screen.getByTestId('episode-audio')
    expect(audioElement).toBeTruthy()
    expect(audioElement.getAttribute('src')).toBe('test.mp3')
  })

  it('should render episode not found', () => {
    (mockLocation.state.episode as any) = undefined

    const { getByText } = render(<EpisodeDetailCard />)

    expect(getByText('Episode Not Found')).toBeTruthy()
  })
})
