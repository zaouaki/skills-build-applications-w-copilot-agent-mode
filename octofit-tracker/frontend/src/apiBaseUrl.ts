declare const __CODESPACE_NAME__: string

const codespaceName = __CODESPACE_NAME__

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'