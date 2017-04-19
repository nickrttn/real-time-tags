const PouchDB = require('pouchdb');
const upsert = require('pouchdb-upsert');

PouchDB.plugin(upsert);

const tags = new PouchDB('tags-db');

module.exports = tags;
