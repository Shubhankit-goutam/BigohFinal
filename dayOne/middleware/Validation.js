async function validateObj(obj) {
  console.log("validate", obj);
  for (var key in obj) {
    if (obj[key] == "") return false;
  }
  return true;
}

module.exports = {
  validateObj,
};
