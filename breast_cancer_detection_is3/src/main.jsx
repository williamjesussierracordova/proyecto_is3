import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
)
