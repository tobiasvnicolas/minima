import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import axios from 'axios'
import App from '../App'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders main heading', () => {
    // Mock successful API responses
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/health')) {
        return Promise.resolve({
          data: {
            status: 'OK',
            message: 'Backend is running successfully',
            timestamp: '2023-01-01T00:00:00.000Z'
          }
        })
      }
      if (url.includes('/api/data')) {
        return Promise.resolve({
          data: {
            message: 'Hello from Minima Backend!',
            data: {
              version: '1.0.0',
              environment: 'test'
            }
          }
        })
      }
      if (url.includes('/api/nombres-espana')) {
        return Promise.resolve({
          data: {
            success: true,
            count: 0,
            data: []
          }
        })
      }
      return Promise.reject(new Error('Not found'))
    })

    render(<App />)
    
    expect(screen.getByText('Minima Frontend')).toBeInTheDocument()
    expect(screen.getByText('Simple React application connected to Node.js backend')).toBeInTheDocument()
  })

  test('displays loading state initially', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {})) // Never resolves
    
    render(<App />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('displays backend data when API calls succeed', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/health')) {
        return Promise.resolve({
          data: {
            status: 'OK',
            message: 'Backend is running successfully',
            timestamp: '2023-01-01T00:00:00.000Z'
          }
        })
      }
      if (url.includes('/api/data')) {
        return Promise.resolve({
          data: {
            message: 'Hello from Minima Backend!',
            data: {
              version: '1.0.0',
              environment: 'test'
            }
          }
        })
      }
      if (url.includes('/api/nombres-espana')) {
        return Promise.resolve({
          data: {
            success: true,
            count: 0,
            data: []
          }
        })
      }
      return Promise.reject(new Error('Not found'))
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Backend Health Status')).toBeInTheDocument()
      expect(screen.getByText('Backend Data')).toBeInTheDocument()
    })

    expect(screen.getByText((content, node) => {
      return node.textContent === 'Status: OK'
    })).toBeInTheDocument()
    expect(screen.getByText((content, node) => {
      return node.textContent === 'Message: Hello from Minima Backend!'
    })).toBeInTheDocument()
    expect(screen.getByText((content, node) => {
      return node.textContent === 'Version: 1.0.0'
    })).toBeInTheDocument()
  })

  test('displays error when API calls fail', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Failed to connect to backend/)).toBeInTheDocument()
    })

    expect(screen.getByText('Retry')).toBeInTheDocument()
  })
})