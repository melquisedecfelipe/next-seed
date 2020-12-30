declare global {
  interface Window {
    gtag: any
  }
}

export const GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS

export const pageView = (url: string) => {
  window.gtag('config', GOOGLE_ANALYTICS, {
    page_path: url
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
