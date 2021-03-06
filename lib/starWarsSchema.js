'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarWarsSchema = undefined;

var _graphql = require('graphql');

var _starWarsData = require('./starWarsData.js');

/**
 * This is designed to be an end-to-end test, demonstrating
 * the full GraphQL stack.
 *
 * We will create a GraphQL schema that describes the major
 * characters in the original Star Wars trilogy.
 *
 * NOTE: This may contain spoilers for the original Star
 * Wars trilogy.
 */

/**
 * Using our shorthand to describe type systems, the type system for our
 * Star Wars example is:
 *
 * enum Episode { NEWHOPE, EMPIRE, JEDI }
 *
 * interface Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 * }
 *
 * type Human : Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   homePlanet: String
 * }
 *
 * type Droid : Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   primaryFunction: String
 * }
 *
 * type Query {
 *   hero(episode: Episode): Character
 *   human(id: String!): Human
 *   droid(id: String!): Droid
 * }
 *
 * We begin by setting up our schema.
 */

/**
 * The original trilogy consists of three movies.
 *
 * This implements the following type system shorthand:
 *   enum Episode { NEWHOPE, EMPIRE, JEDI }
 */
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

var episodeEnum = new _graphql.GraphQLEnumType({
  name: 'Episode',
  description: 'One of the films in the Star Wars Trilogy',
  values: {
    NEWHOPE: {
      value: 4,
      description: 'Released in 1977.'
    },
    EMPIRE: {
      value: 5,
      description: 'Released in 1980.'
    },
    JEDI: {
      value: 6,
      description: 'Released in 1983.'
    }
  }
});

/**
 * Characters in the Star Wars trilogy are either humans or droids.
 *
 * This implements the following type system shorthand:
 *   interface Character {
 *     id: String!
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     secretBackstory: String
 *   }
 */
var characterInterface = new _graphql.GraphQLInterfaceType({
  name: 'Character',
  description: 'A character in the Star Wars Trilogy',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The id of the character.'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the character.'
      },
      friends: {
        type: new _graphql.GraphQLList(characterInterface),
        description: 'The friends of the character, or an empty list if they ' + 'have none.'
      },
      appearsIn: {
        type: new _graphql.GraphQLList(episodeEnum),
        description: 'Which movies they appear in.'
      },
      secretBackstory: {
        type: _graphql.GraphQLString,
        description: 'All secrets about their past.'
      }
    };
  },
  resolveType: function resolveType(character) {
    return (0, _starWarsData.getHuman)(character.id) ? humanType : droidType;
  }
});

/**
 * We define our human type, which implements the character interface.
 *
 * This implements the following type system shorthand:
 *   type Human : Character {
 *     id: String!
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     secretBackstory: String
 *   }
 */
var humanType = new _graphql.GraphQLObjectType({
  name: 'Human',
  description: 'A humanoid creature in the Star Wars universe.',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The id of the human.'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the human.'
      },
      friends: {
        type: new _graphql.GraphQLList(characterInterface),
        description: 'The friends of the human, or an empty list if they ' + 'have none.',
        resolve: function resolve(human) {
          return (0, _starWarsData.getFriends)(human);
        }
      },
      appearsIn: {
        type: new _graphql.GraphQLList(episodeEnum),
        description: 'Which movies they appear in.'
      },
      homePlanet: {
        type: _graphql.GraphQLString,
        description: 'The home planet of the human, or null if unknown.'
      },
      secretBackstory: {
        type: _graphql.GraphQLString,
        description: 'Where are they from and how they came to be who they are.',
        resolve: function resolve() {
          throw new Error('secretBackstory is secret.');
        }
      }
    };
  },
  interfaces: [characterInterface]
});

/**
 * The other type of character in Star Wars is a droid.
 *
 * This implements the following type system shorthand:
 *   type Droid : Character {
 *     id: String!
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     secretBackstory: String
 *     primaryFunction: String
 *   }
 */
var droidType = new _graphql.GraphQLObjectType({
  name: 'Droid',
  description: 'A mechanical creature in the Star Wars universe.',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The id of the droid.'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the droid.'
      },
      friends: {
        type: new _graphql.GraphQLList(characterInterface),
        description: 'The friends of the droid, or an empty list if they ' + 'have none.',
        resolve: function resolve(droid) {
          return (0, _starWarsData.getFriends)(droid);
        }
      },
      appearsIn: {
        type: new _graphql.GraphQLList(episodeEnum),
        description: 'Which movies they appear in.'
      },
      secretBackstory: {
        type: _graphql.GraphQLString,
        description: 'Construction date and the name of the designer.',
        resolve: function resolve() {
          throw new Error('secretBackstory is secret.');
        }
      },
      primaryFunction: {
        type: _graphql.GraphQLString,
        description: 'The primary function of the droid.'
      }
    };
  },
  interfaces: [characterInterface]
});

/**
 * This is the type that will be the root of our query, and the
 * entry point into our schema. It gives us the ability to fetch
 * objects by their IDs, as well as to fetch the undisputed hero
 * of the Star Wars trilogy, R2-D2, directly.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     hero(episode: Episode): Character
 *     human(id: String!): Human
 *     droid(id: String!): Droid
 *   }
 *
 */
var queryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      hero: {
        type: characterInterface,
        args: {
          episode: {
            description: 'If omitted, returns the hero of the whole saga. If ' + 'provided, returns the hero of that particular episode.',
            type: episodeEnum
          }
        },
        resolve: function resolve(root, _ref) {
          var episode = _ref.episode;
          return (0, _starWarsData.getHero)(episode);
        }
      },
      human: {
        type: humanType,
        args: {
          id: {
            description: 'id of the human',
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          }
        },
        resolve: function resolve(root, _ref2) {
          var id = _ref2.id;
          return (0, _starWarsData.getHuman)(id);
        }
      },
      droid: {
        type: droidType,
        args: {
          id: {
            description: 'id of the droid',
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          }
        },
        resolve: function resolve(root, _ref3) {
          var id = _ref3.id;
          return (0, _starWarsData.getDroid)(id);
        }
      }
    };
  }
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
var StarWarsSchema = exports.StarWarsSchema = new _graphql.GraphQLSchema({
  query: queryType,
  types: [humanType, droidType]
});