/**
 * Dispatches main app tasks
 * @param {string} accessToken; see http://ramblings.mcpher.com/Home/excelquirks/goa/userresources for a use case
 * @param {*} params GET or POST event parameters
 * @param {string} method Request method: GET|POST
 * @returns {string} HTML output
 */
function dispatch(accessToken, params, method) {
  var htmlT = HtmlService
    .createTemplateFromFile('index');

  htmlT.vm = {
    debug    : {
      method      : method,
      accessToken : accessToken,
      params      : params,
    }
  };

  var html = htmlT.evaluate()
    .setTitle("GAS GOA boilerplate")
    .setFaviconUrl('https://cdn.rawgit.com/OleksiyRudenko/gd-linkman/fca04054/favicon-32x32.png');

  return html;
}