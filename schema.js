const fetch = require('node-fetch');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const CardType = new GraphQLObjectType({
  name: 'Card',
  description: '......',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name
    },
    type: {
      type: GraphQLString,
      resolve: ({ type }) => type
    },
    race: {
      type: GraphQLString,
      resolve: ({ race }) => race
    }
  })
});

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      cardById: {
        type: CardType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          fetch(`https://db.ygoprodeck.com/api/v5/cardinfo.php?name=${args.id}`)
            .then(response => response.json())
            .then(json => json[0])
      },
      cardByName: {
        type: GraphQLList(CardType),
        args: {
          name: { type: GraphQLString }
        },
        resolve: (root, args) =>
          fetch(
            `https://db.ygoprodeck.com/api/v5/cardinfo.php?fname=${args.name}`
          ).then(response => response.json())
      }
    })
  })
});

module.exports = Schema;
