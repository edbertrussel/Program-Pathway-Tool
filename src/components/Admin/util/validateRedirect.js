function validateRedirect(code) {
  if (code === 403) {
    return "Unauthorized";
  } else if (code === 409) {
    return "Duplicate ID/Data or invalid ID, Please check if you have entered the valid information";
  } else if (code === 404) {
    return "Data Not Found";
  }
  return "";
}
export default validateRedirect;
