const DEFAULT_NOTES = "dn";
const DARK_MODE = "dm";

function setItem(key, value, service) {
  service.setItem(key, value);
}

function getItem(key, service) {
  try {
    return JSON.parse(service.getItem(key));
  } catch (err) {
    return;
  }
}

function setDefaultNotes(value, service = localStorage) {
  setItem(DEFAULT_NOTES, value, service);
}

function getDefaultNotes(service = localStorage) {
  return getItem(DEFAULT_NOTES, service);
}

function setDarkMode(value, service = localStorage) {
  setItem(DARK_MODE, value, service);
}

function getDarkMode(service = localStorage) {
  return getItem(DARK_MODE, service);
}

export default {
  setDefaultNotes,
  getDefaultNotes,
  setDarkMode,
  getDarkMode,
  DEFAULT_NOTES,
  DARK_MODE,
};
