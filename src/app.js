/**
 * Standalone Web Application entry points
 */

/**
 * GET request entry point
 * @param e Event GET parameters
 * @returns String HTML output
 */
function doGet(e) {
  // Since OAuth cycle served via GET requests app actions are called from auth() method
  return auth(e,'GET');
}

/**
 * POST request entry point
 * @param e Event POST parameters
 * @returns String HTML output
 */
function doPost(e) {
  // While OAuth cycle not served via POST request we may need refreshing access token, which is done by auth() method
  return auth(e,'POST');
}