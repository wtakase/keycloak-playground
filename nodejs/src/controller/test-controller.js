var express = require('express');
var router = express.Router();

const keycloak = require('../config/keycloak-config.js').getKeycloak();

router.get('/anonymous', function(req, res) {
  res.json({message: 'Hello Anonymous'});
});

router.get('/user', keycloak.protect('user'), function(req, res) {
  res.json({message: 'Hello User'});
});

router.get('/admin', keycloak.protect('admin'), function(req, res) {
  res.json({message: 'Hello Admin'});
});

router.get('/all-user', keycloak.protect(['user', 'admin']), function(req, res) {
  res.json({message: 'Hello All User'});
});

module.exports = router;
