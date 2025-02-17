import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rotas from './rotas'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotas />
  </StrictMode>,
)
