import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchJson('leaderboard')
        setEntries(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="h3">Leaderboard</h1>
        <p className="text-muted">Competitive standings for the Octofit community.</p>

        {loading && <div className="alert alert-light">Loading leaderboard...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      No leaderboard entries yet.
                    </td>
                  </tr>
                ) : (
                  entries.map((entry, index) => (
                    <tr key={entry._id ?? `${entry.name}-${index}`}>
                      <td>{entry.rank ?? index + 1}</td>
                      <td>{entry.name ?? 'Unknown'}</td>
                      <td>{entry.score ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
