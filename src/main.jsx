import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Service worker: usar o worker do OneSignal para push/PWA

// OneSignal Web SDK v16 init
const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID
const ONESIGNAL_SAFARI_WEB_ID = import.meta.env.VITE_ONESIGNAL_SAFARI_WEB_ID
if (ONESIGNAL_APP_ID) {
  const script = document.createElement('script')
  script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
  script.defer = true
  document.head.appendChild(script)
  window.OneSignalDeferred = window.OneSignalDeferred || []
  window.OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      safari_web_id: ONESIGNAL_SAFARI_WEB_ID,
      notifyButton: { enable: false },
    })
    try {
      const isSubscribed = await OneSignal.User.isSubscribed()
      if (!isSubscribed && Notification.permission !== 'granted') {
        await OneSignal.Notifications.requestPermission()
        await OneSignal.Notifications.subscribe()
      }
    } catch { /* noop */ }
  })
}
