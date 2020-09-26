const DEFAULT_NOTES = "default_notes";

function setItem(key, value, service) {
  service.setItem(key, value);
}

function getItem(key, service) {
  return JSON.parse(service.getItem(key));
}

function setDefaultNotes(value, service = localStorage) {
  setItem(DEFAULT_NOTES, value, service);
}

function getDefaultNotes(service = localStorage) {
  return getItem(DEFAULT_NOTES, service);
}

export default {
  setDefaultNotes,
  getDefaultNotes,
  DEFAULT_NOTES,
};
