import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css'
import './translate/i18.js'

createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
)
