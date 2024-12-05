/**
 * @param {Boolean} auth canEdit
 * @param {Function} setAlert setAlert
 * @returns Object (true) or false
 */
export default function isAuthorized(auth, setAlert) {
  if (auth) {
    return true;
  }

  setAlert({
    danger:
      "ERROR\nCannot be completed due to insufficient permissions.\nPlease ensure you have the necessary access rights or contact your administrator for assistance.",
  });
  return false;
}
