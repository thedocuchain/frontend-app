// Only allow internal, same-origin paths as post-auth redirect targets to
// avoid open-redirects. Protocol-relative (//host) and absolute URLs are rejected.
export function safeInternalPath(value: unknown): string | null {
  if (typeof value !== 'string') return null
  if (!value.startsWith('/')) return null
  if (value.startsWith('//') || value.startsWith('/\\')) return null
  return value
}
