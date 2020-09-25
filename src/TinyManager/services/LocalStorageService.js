const DEFAULT_NOTES = "default_notes";

function setDefaultNotes(value, service = localStorage) {
  service.setItem(DEFAULT_NOTES, value);
}

function getDefaultNotes(service = localStorage) {
  return service.getItem(DEFAULT_NOTES);
}

export default {
  setDefaultNotes,
  getDefaultNotes,
  DEFAULT_NOTES,
};
