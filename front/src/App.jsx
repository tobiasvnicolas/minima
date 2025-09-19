import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [backendData, setBackendData] = useState(null)
  const [healthStatus, setHealthStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch health status
        const healthResponse = await axios.get('http://localhost:3001/health')
        setHealthStatus(healthResponse.data)

        // Fetch backend data
        const dataResponse = await axios.get('http://localhost:3001/api/data')
        setBackendData(dataResponse.data)

      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to connect to backend. Make sure the backend server is running on port 3001.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const refreshData = () => {
    setLoading(true)
    setError(null)
    
    // Re-fetch data
    const fetchData = async () => {
      try {
        const healthResponse = await axios.get('http://localhost:3001/health')
        setHealthStatus(healthResponse.data)

        const dataResponse = await axios.get('http://localhost:3001/api/data')
        setBackendData(dataResponse.data)
      } catch (err) {
        setError('Failed to connect to backend')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Minima Frontend</h1>
        <p>Simple React application connected to Node.js backend</p>
        
        <div className="content">
          {loading && <div className="loading">Loading...</div>}
          
          {error && (
            <div className="error">
              <p>{error}</p>
              <button onClick={refreshData}>Retry</button>
            </div>
          )}
          
          {!loading && !error && (
            <>
              <div className="data-section">
                <h2>Backend Health Status</h2>
                {healthStatus && (
                  <div className="health-status">
                    <p><strong>Status:</strong> {healthStatus.status}</p>
                    <p><strong>Message:</strong> {healthStatus.message}</p>
                    <p><strong>Timestamp:</strong> {new Date(healthStatus.timestamp).toLocaleString()}</p>
                  </div>
                )}
              </div>

              <div className="data-section">
                <h2>Backend Data</h2>
                {backendData && (
                  <div className="backend-data">
                    <p><strong>Message:</strong> {backendData.message}</p>
                    <p><strong>Version:</strong> {backendData.data?.version}</p>
                    <p><strong>Environment:</strong> {backendData.data?.environment}</p>
                  </div>
                )}
              </div>

              <button onClick={refreshData} className="refresh-button">
                Refresh Data
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  )
}

export default App