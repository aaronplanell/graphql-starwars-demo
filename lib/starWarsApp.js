'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _starWarsSchema = require('./starWarsSchema.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)().use('/graphql', (0, _expressGraphql2.default)({ schema: _starWarsSchema.StarWarsSchema, pretty: true })).listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');