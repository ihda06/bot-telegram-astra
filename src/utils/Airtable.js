const Airtable = require("airtable");
require("dotenv").config();

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;

const Airtables = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

const checkUserName = async (usnTele) => {
  const data = await Airtables("databaseTwitter")
    .select({ filterByFormula: `username_tele = "${usnTele}"` })
    .all();
  if (data.length === 0) {
    return 0;
  } else {
    if (data[0].fields.verified) {
      return 2;
    } else {
      return 1;
    }
  }
};

module.exports = { Airtables, checkUserName };
