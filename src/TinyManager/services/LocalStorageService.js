const DEFAULT_NOTES = "dn";
const DARK_MODE = "dm";
const NOTES = "ns";

function setItem(key, value, service) {
  service.setItem(key, JSON.stringify(value));
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

function setNotes(value, service = localStorage) {
  setItem(NOTES, value, service);
}

function getNotes(service = localStorage) {
  return getItem(NOTES, service);
}

export default {
  setDefaultNotes,
  getDefaultNotes,
  setDarkMode,
  getDarkMode,
  setNotes,
  getNotes,
  DEFAULT_NOTES,
  DARK_MODE,
  NOTES,
};
