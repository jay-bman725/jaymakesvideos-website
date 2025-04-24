import { useEffect } from "react"
import { Router } from "next/router"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

export default function App({ Component, pageProps }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug()
      },
      debug: process.env.NODE_ENV === "development",
    })

    const handleRouteChange = () => posthog?.capture("$pageview")
    Router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])

  return (
    <PostHogProvider client={posthog}>
      <Component {...pageProps} />
    </PostHogProvider>
  )
}
