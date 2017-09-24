var AUTH = {
  runOneOff    : true,
  clientId     : '315732288425-sskjd0rth7uvidmiv6d1lv0fl3bjru0j.apps.googleusercontent.com',
  clientSecret : 'szSQH9z5pMQTw7TYpvuCVFfu',
  packageName  : 'gas_goa_boilerplate',
  service      : 'google',
  scopes       : [
    'userinfo.email',
    'userinfo.profile',
    'drive.install',
    'drive'],
};

/**
 * Serve OAuth cycle and call main app tasks when authorization cycle complete.
 * Called by methods from app.gs
 * @param {*} e GET or POST event parameters
 * @param {string} method Request method: GET|POST
 * @returns {string} HTML output
 */
function auth(e, method) {
  if (AUTH.runOneOff)
    authOneOff();

  var userPropertyStore = PropertiesService.getUserProperties(),
    scriptPropertyStore = PropertiesService.getScriptProperties();

  // copy package created by authOneOff() for a specific user if needed
  cGoa.GoaApp.userClone(AUTH.packageName, scriptPropertyStore , userPropertyStore);

  // create a user specific package
  var goa = cGoa.GoaApp.createGoa(AUTH.packageName,userPropertyStore).execute(e);

  // it's possible that we need consent - this will cause a consent dialog
  if (goa.needsConsent()) {
    return goa.getConsent();
  }

  // if we get here it's time for your webapp to run and we should have a token, or thrown an error somewhere
  if (!goa.hasToken())
    throw 'something went wrong with goa - did you check if consent\'s being required?';

  // This is a webapp doing whatever its supposed to do
  // getParams is used to retrieve the original parameters passed to this function
  var html = dispatch (goa.getToken(), goa.getParams(), method );

  // remove package -- if you want to disable access to the service for the user and need an auth dialog again
  // uncomment the following line
  ////goa.remove();

  // now return it as normal
  return HtmlService.createHtmlOutput(html); // .getContentText());
  //  .setSandboxMode(HtmlService.SandboxMode.IFRAME); // IFRAME is a default sandboxing mode
}

/**
 * Makes initial OAuth magic and stores everything required at script properties.
 * Requires only single run at script roll-out phase.
 */
function authOneOff() {
  cGoa.GoaApp.setPackage(PropertiesService.getScriptProperties(), {
    clientId     : AUTH.clientId,
    clientSecret : AUTH.clientSecret,
    scopes       : cGoa.GoaApp.scopesGoogleExpand(AUTH.scopes),
    service      : AUTH.service,
    packageName  : AUTH.packageName,
  });

}