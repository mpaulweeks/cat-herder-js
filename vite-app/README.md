# cat-herder-js vite-app

Vite app goes here

## Single Page App Trickery

Single Page Apps that want to use arbitrary paths need custom routing to always return `index.html`. GitHub pages does not support this. However, they do support the user providing a custom `404` response page.

1. User visits `example.com/slug` and gets a 404, which serves [404.html](public/404.html)
1. Our custom 404 page reads the path and does a JS redirect to `example.com/#/slug`
1. GitHub Pages server ignores everything after the hash, so it serves [index.html](index.html) which loads the app
1. Our app parses the hash URL, does internal navigation, and then pushes the original path URL to the window
1. User is now in the app with the pretty path URL

When running Vite locally for development, it already serves index.html on any 404, skipping the redirect steps. To handle both local and prod, the App parses urls using either pathname or hash. It also supports query parameters (for legacy links).
