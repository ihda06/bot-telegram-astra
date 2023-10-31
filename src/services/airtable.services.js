const Airtables = require("../utils/Airtable");

const checkverified = async (usn) => {
  const data = await Airtables("databaseTwitter")
    .select({ filterByFormula: `username_tele = "${usn}"` })
    .all();
  if (data.length === 0) {
    return 0
  } else {
    if (data[0].fields.verified) {
        return 2
    } else {
        return 1
    }
  }
};

module.exports = {
    checkverified
}
