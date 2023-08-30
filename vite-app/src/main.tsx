import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './comp/App.tsx'
import './index.css'
import { FirebaseApi } from './lib/apiFirebase.ts'
import { EventDate } from './lib/eventDate.ts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).EventDate = EventDate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).FirebaseApi = FirebaseApi;

// makes the back/forward button work with my pushState meddling
window.addEventListener('popstate', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).location = window.location.href;
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
