/// <reference types="vite/client" />

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiRootUrl = `${apiBaseUrl}/api`

export function getApiUrl(component: string) {
  return `${apiRootUrl}/${component}/`
}

export function getCollection(response: unknown, collectionName: string) {
  if (Array.isArray(response)) {
    return response
  }

  const payload = response && typeof response === 'object' ? response as Record<string, unknown> : {}
  const collection = payload[collectionName]
  const results = payload.results
  const data = payload.data

  if (Array.isArray(collection)) {
    return collection
  }

  if (Array.isArray(results)) {
    return results
  }

  if (Array.isArray(data)) {
    return data
  }

  return []
}