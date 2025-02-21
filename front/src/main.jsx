import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rotas from './rotas'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './services/context/user';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Rotas />
    </UserProvider>
  </StrictMode>,
)
