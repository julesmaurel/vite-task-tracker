# React + Vite

Goal: teaching myself React and general web development

Task tracker in React, built with Vite, following this tutorial https://www.youtube.com/watch?v=w7ejDZ8SWv8&t, and expanded with MongoDB.
Also runs in a docker container.

To run locally:

Add your MongoDB key in `server/.env`

- copy repo and cd to the root
- `npm i`
- `npm run start` to start the app locally to port 3000

You can also use docker, making sure you have Docker install and then run `docker-compose up` and then visit `http://localhost:3000/`

To run the e2e tests, `cd playwright` and `npx playwright test`, just make sure you start the app first.
