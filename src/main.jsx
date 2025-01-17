import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='container mx-auto max-w-7xl px-5'>
    <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
