# React + Vite + Mongo + Playwright

Teaching myself React and fullstack web development

Task tracker in React, built with Vite, following this tutorial https://www.youtube.com/watch?v=w7ejDZ8SWv8&t, and expanded with MongoDB. Also runs in a docker container.

## Setup local environment

To run locally, copy change `example.env` to `.env`, and add your MongoDB key

- copy repo and cd to the root
- `npm i`
- `npm run start` to start the app locally to port 3000

You can also use docker, make sure you have Docker installed and then run `docker-compose up` and then visit `http://localhost:3000/`

## Running E2E tests

Start you local enviromment then run the e2e tests, `cd playwright` and `npx playwright test`.
