import { defineMiddleware } from 'astro:middleware';

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  let urlString = context.url.toString();
  if (urlString.includes('#/') || urlString.includes('?id=')) {
    urlString = urlString.replace('#/', '').replace('?id=', '/#');
    return Response.redirect(new URL(urlString), 302);
  }
  return next();
});
