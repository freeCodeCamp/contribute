export function getRedirectedPath(hash: string) {
  if (!hash || hash === '#/' || hash === '#') {
    return '/intro/';
  } else if (hash.startsWith('#/')) {
    const [rawPath, newHash] = hash.slice(2).split('?id=');
    const cleanPath = rawPath.replace(/^\/+|\/+$/g, '');
    if (!cleanPath) {
      return '/intro/';
    }
    return newHash ? `/${cleanPath}/#${newHash}` : `/${cleanPath}/`;
  } else {
    return '/intro/';
  }
}
