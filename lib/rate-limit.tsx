

import { LRUCache } from 'lru-cache'

export function rateLimit(options: { interval: number; uniqueTokenPerInterval: number }) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  })

  return {
    check: async (limit: number, token: string) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0]
      if (tokenCount[0] === 0) {
        tokenCache.set(token, [1])
        return Promise.resolve()
      }
      if (tokenCount[0] === limit) {
        return Promise.reject()
      }
      tokenCount[0] += 1
      tokenCache.set(token, tokenCount)
      return Promise.resolve()
    },
  }
}