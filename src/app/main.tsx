import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'


import Providers from './providers.tsx'
import Routes from './routes/routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>,
)
