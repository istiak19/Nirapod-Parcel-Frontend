import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/index.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { ThemeProvider } from './context/Theme-provider.tsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
