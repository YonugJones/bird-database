import { useEffect, useState } from 'react'
import {
  getRecentObservationsByRegion,
  type EbirdObservation,
} from '../api/eBirdClient'

export function useRecentObservations(regionCode: string, maxResults = 20) {
  const [data, setData] = useState<EbirdObservation[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!regionCode) return

    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const observations = await getRecentObservationsByRegion(regionCode, {
          maxResults,
          signal: controller.signal,
        })

        setData(observations)
      } catch (err) {
        // If we aborted, silently ignore
        if (err instanceof DOMException && err.name === 'AbortError') return

        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Unknown error when fetching observations')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Cleanup: cancel request if region changes or component unmounts
    return () => {
      controller.abort()
    }
  }, [regionCode, maxResults])

  return { data, loading, error }
}
