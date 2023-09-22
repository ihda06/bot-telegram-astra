const Airtable = require("airtable");
require("dotenv").config();

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;

const Airtables = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

module.exports = Airtables