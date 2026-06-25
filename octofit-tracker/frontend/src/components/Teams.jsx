import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchJson('teams')
        setTeams(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="h3">Teams</h1>
        <p className="text-muted">Create and manage fitness teams.</p>

        {loading && <div className="alert alert-light">Loading teams...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Members</th>
                  <th scope="col">Goal</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      No teams found yet.
                    </td>
                  </tr>
                ) : (
                  teams.map((team, index) => (
                    <tr key={team._id ?? `${team.name}-${index}`}>
                      <td>{team.name ?? 'Unknown'}</td>
                      <td>{team.members?.length ?? 0}</td>
                      <td>{team.goal ?? '—'}</td>
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

export default Teams
