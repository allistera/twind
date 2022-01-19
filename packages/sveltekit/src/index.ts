import type { Handle } from '@sveltejs/kit'
import type { Twind } from 'twind'

import { extract, tw as defaultTw } from 'twind'

export function withTwind(tw: Twind = defaultTw): Handle {
  return async function withTwind$({ request, resolve }) {
    const response = await resolve(request)

    if (response.headers['content-type'] === 'text/html' && typeof response.body === 'string') {
      const { html, css } = extract(response.body, tw)

      // TODO create file and link to that (inmemory, build/server/stylesheets, kit: inlineStyleThreshold, )
      response.body = html.replace('</head>', `<style data-twind>${css}</style></head>`)
    }

    return response
  }
}
