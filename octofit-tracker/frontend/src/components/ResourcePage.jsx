import { useEffect, useState } from 'react'
import { getApiUrl, getCollection } from '../apiBaseUrl.ts'

function ResourcePage({ collectionName, title, description, columns, renderItem }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadItems() {
      setStatus('loading')
      setError('')

      try {
        const response = await fetch(getApiUrl(collectionName))

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        const collection = getCollection(data, collectionName)

        if (!ignore) {
          setItems(collection)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadItems()

    return () => {
      ignore = true
    }
  }, [collectionName])

  return (
    <section className="resource-panel">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">{collectionName}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="resource-count">{items.length}</span>
      </div>

      {status === 'loading' && <p className="status-message">Loading {collectionName}...</p>}
      {status === 'error' && <p className="status-message error">{error}</p>}
      {status === 'ready' && items.length === 0 && (
        <p className="status-message">No {collectionName} found.</p>
      )}

      {status === 'ready' && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>{items.map(renderItem)}</tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourcePage