export const isArray = payload => Array.isArray(payload);

export const isString = payload => typeof payload === 'string';

export const types = {
  REMOVE_LISTENER_FROM: 'REMOVE_LISTENER_FROM', // just for brevity
  REMOVE_LISTENERS_FROM: 'REMOVE_LISTENERS_FROM',
  ADD_LISTENER_TO: 'ADD_LISTENER_FROM',
  ADD_LISTENERS_TO: 'ADD_LISTENERS_FROM',
  REMOVE_ALL_LISTENERS: 'REMOVE_ALL_LISTENERS',
};

export const errorMessages = {
  SHOULD_BE_AN_ARRAY_OR_STRING: 'Event names should either be an array of strings or just a string.',
  SHOULD_BE_AN_ARRAY: 'Event names should be an array of strings',
  CONNECTION_ERROR: 'An error has been occurred while creating a connection.',
};