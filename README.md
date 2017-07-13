# Headhunter Test

Basically an 'application' which uses Twitter API to do basic things. A single-user - using access tokens from Twitter developer account.

- Change `twitterConfig.json` to use proper keys
- Download dependencies using `yarn install` followed by `yarn upgrade`
- Build the client with `npm run webpack`
- Start server with `node app.js`
- Start another server for client in `dist` folder with whatever server flavor you like, e.g. `live-server`

Problems:
- No behaviour whatsoever for success and failed requests
- Didn't try the prod webpack config
- Still using outdated npm modules because updating things is PITA
- No tests suite, because.

No `bootstrap` or `foundation` because I hate css suites. I hate their default styles, complication for things, and the bloats.

Most of the time when we do create things, we ended up writing styles from scratch anyway - except when it's overly basic thing. So we only need the grid system from `bootstrap` and likes. Just use `postcss` plugin then. Or create it by yourself because you are a skillful person. Right?

Also, `full-stack developer` is a meme.