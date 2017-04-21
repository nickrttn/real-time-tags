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

## Uses

- Express.js
- Instagram API
- PouchDB
