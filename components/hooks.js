import React from 'react'

function userTiming({ category, status, value }) {
  try {
    window.gtag('event', status, {
      event_category: 'Performance',
      event_label: category,
      value,
    })
  } catch (err) {
    // pass
  }
}

export function usePerformanceMeasurement() {
  React.useEffect(() => {
    try {
      if (window.performance && window.performance.getEntriesByType) {
        window.performance.getEntriesByType('paint').forEach(entry => {
          userTiming({
            category: 'paint',
            status: entry.name,
            value: entry.startTime,
          })
        })
        const navigationTiming = window.performance.getEntriesByType('navigation')
          ? window.performance.getEntriesByType('navigation')[0]
          : null
        if (navigationTiming) {
          userTiming({
            category: 'paint',
            status: 'time to first byte',
            value: navigationTiming.responseEnd - navigationTiming.requestStart,
          })
        }

        const javascriptFiles = performance.getEntries().filter(resource => {
          return resource.name.startsWith(`${location.origin}/_next/static`)
        })

        /*
         * Tracks total number of javascript used,
         * helps in tracking the effect of granular chunks work
         */
        userTiming({
          category: 'javascript',
          status: 'script count',
          value: javascriptFiles.length,
        })

        /*
         * Tracks total size of javascript used,
         * helps in tracking the effect of modern/nomodern work
         */
        userTiming({
          category: 'javascript',
          status: 'script size',
          value: javascriptFiles.reduce((sum, script) => script.encodedBodySize + sum, 0),
        })
      }
    } catch (error) {
      console.error(error)
    }
  }, [])
}
