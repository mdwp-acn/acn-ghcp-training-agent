import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchJson('activities')
        setActivities(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="h3">Activities</h1>
        <p className="text-muted">Recent activity records from the Octofit backend.</p>

        {loading && <div className="alert alert-light">Loading activities...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      No activities found yet.
                    </td>
                  </tr>
                ) : (
                  activities.map((activity, index) => (
                    <tr key={activity._id ?? `${activity.type}-${index}`}>
                      <td>{activity.type ?? 'Unknown'}</td>
                      <td>{activity.duration ?? '—'}</td>
                      <td>{activity.notes ?? '—'}</td>
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

export default Activities
