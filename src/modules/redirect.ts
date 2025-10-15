export function getRedirectedPath(hash: string) {
  if (!hash || hash === '#/' || hash === '#') {
    return '/intro/';
  } else if (hash.startsWith('#/')) {
    const [newPath, newHash] = hash.slice(2).split('?id=');
    return newHash ? `/${newPath}/#${newHash}` : `/${newPath}/`;
  } else {
    return '/intro/';
  }
}
