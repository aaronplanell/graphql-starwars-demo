import express from 'express';
import graphqlHTTP from 'express-graphql';
import { StarWarsSchema } from './starWarsSchema.js';

var app = express()
  .use('/graphql', graphqlHTTP({ schema: StarWarsSchema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
