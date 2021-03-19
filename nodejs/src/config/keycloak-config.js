var Keycloak = require('keycloak-connect');

let _keycloak;

function initKeycloak(memoryStore) {
  if (_keycloak) {
    console.warn('Trying to init Keycloak again!');
    return _keycloak;
  } else {
    console.log('Initializing Keycloak...');
    _keycloak = new Keycloak({store: memoryStore});
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please called init first.');
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak
};
