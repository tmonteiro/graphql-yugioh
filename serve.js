const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();
const port = 3333;

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema
  })
);

app.get('/', (req, res) => res.send('mama mias'));

app.listen(port, () => console.log(`app listening on port ${port}`));
