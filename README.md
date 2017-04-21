# real-time-tags
Near real-time data visualisation of a users' Instagram tags and how they connect throughout the platform.

## How to run it

1. Clone the repository.
	 `git clone https://github.com/nickrttn/real-time-tags.git`
2. Create an `.env` file
	 It should contain the following variables:
	 - `PORT` (Port to listen on)
	 - `SESSION_SECRET` (Random 24 character hash)
	 - `IG_CLIENT` (Instagram Client ID)
	 - `IG_SECRET` (Instagram Client Secret)
	 - `IG_ENDPOINT` (Instagram API URL)
	 - `IG_OAUTH` (Instagram oAuth URL)
3. Install the required packages
	 `npm install`
4. Run the application
	 `npm start`

## Implemented

- oAuth 2.0 authentication flow
- Promise-based API calls and data parsing

## To do

- Find a neat visualisation form for the tag data
- Find a way to work around rate limits. The way the application is structured right now has me running into rate limits very fast, because I have to request data for each tag a user recently used separately. However, IG doesn't support requesting data for multiple tags at the same time, so I might have a problem.
- Design the shit out of it
- Clean up the request for logged in users.
- Find a way to update the tags data without doing a shitload of requests.
- Figure out the optimal polling rate for my app type (production or sandbox), and limit requests to that.
- Seed the database with tags data once for each user, and from then on, do not exceed the rate limit. Update accordingly.
- Use a CouchDB server instead of a local PouchDB data store.
- GraphQL (?)
- Isomorphic rendering

## Uses

- Express.js
- Instagram API
- PouchDB
