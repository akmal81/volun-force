import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { Tooltip } from 'react-tooltip'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
        <Tooltip />
      </AuthProvider>
   </HelmetProvider>
  </StrictMode>,
)
