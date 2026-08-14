import { Navigate, Route, Routes } from 'react-router-dom'
import { AppPage } from './app/AppPage'
import { AppShell } from './layout/AppShell'
import { ComponentPage } from './pages/ComponentPage'
import { IconsPage } from './pages/IconsPage'
import { OverviewPage } from './pages/OverviewPage'

export default function App() {
  return (
    <Routes>
      <Route path="app" element={<AppPage />} />
      <Route element={<AppShell />}>
        <Route index element={<OverviewPage />} />
        <Route path="icons" element={<IconsPage />} />
        <Route path="components/:slug" element={<ComponentPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
