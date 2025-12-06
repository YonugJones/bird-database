// This file knows how to talk to eBird, nothing about React

const EBIRD_BASE_URL = 'https://api.ebird.org/v2'
const API_KEY = import.meta.env.VITE_EBIRD_API_KEY

// included so no api key gives immediate warn
if (!API_KEY) {
  console.warn('VITE_EBIRD_API_KEY is not set. eBird requests will fail.')
}

// typing the incoming bird data
// GET /data/obs/{region}/recent
export type EbirdObservation = {
  speciesCode: string
  comName: string
  sciName: string
  locName: string
  obsDt: string
  howMany?: number
  lat: number
  lng: number
}

// Small helper type to allow passing extra optional parameters into the API call
type RequestOptions = {
  signal?: AbortSignal
  maxResults?: number
}

// The core fetch helper
async function ebirdFetch<T>(
  path: string,
  { signal }: { signal?: AbortSignal } = {}
): Promise<T> {
  const res = await fetch(`${EBIRD_BASE_URL}${path}`, {
    headers: {
      'X-eBirdApiToken': API_KEY ?? '',
    },
    signal,
  })

  if (!res.ok) {
    throw new Error(`eBird error: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

// The public API function
export function getRecentObservationsByRegion(
  regionCode: string,
  options: RequestOptions = {}
) {
  const { maxResults, signal } = options

  const params = new URLSearchParams()
  if (maxResults !== undefined) {
    params.set('maxResults', String(maxResults))
  }

  const query = params.toString()
  const path = `/data/obs/${regionCode}/recent/${query ? `?${query}` : ''}`

  return ebirdFetch<EbirdObservation[]>(path, { signal })
}
