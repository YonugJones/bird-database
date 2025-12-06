import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import ErrorMessage from '../components/ui/ErrorMessage'
import HomePage from '../pages/HomePage'
import ExplorePage from '../pages/ExplorePage'
import SpeciesDetailPage from '../pages/SpeciesDetailPage'
import RegionPage from '../pages/RegionPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorMessage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'species/:code', element: <SpeciesDetailPage /> },
      { path: 'region/:regionCode', element: <RegionPage /> },
    ],
  },
])

export default router
