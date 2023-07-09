import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './comp/App.tsx'
import './index.css'
import { FirebaseApi } from './lib/apiFirebase.ts'

(window as any).FirebaseApi = FirebaseApi;

// makes the back/forward button work with my pushState meddling
window.addEventListener('popstate', () => {
  (window as any).location = window.location.href;
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
