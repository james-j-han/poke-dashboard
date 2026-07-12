import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Dashboard from './components/Dashboard.jsx'
import DetailView from './components/DetailView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path='pokemon/:id' element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <App />
  </StrictMode>,
)
