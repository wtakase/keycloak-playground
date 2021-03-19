var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

var memoryStore = new session.MemoryStore();
app.use(session({
  secret: '72a854a4-890c-4585-b302-344adf494da5',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
const keycloak = require('./config/keycloak-config.js').initKeycloak(memoryStore);
app.use(keycloak.middleware());

const testController = require('./controller/test-controller.js');
app.use('/test', testController);

app.get('/', function(req, res) {
  res.send('Server is up!');
});

app.listen(8888);
