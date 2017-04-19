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
3. Install the required packages
	 `npm install`
4. Run the application
	 `npm start`

## Uses

- Express.js
- Instagram API
- PouchDB
