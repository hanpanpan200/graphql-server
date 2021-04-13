const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const schema = gql`
  type Query {
	  header: Header
    posts: [Post]
    footer: Footer
  }
  type Header {
	  text: String
	  priority: HeaderPriority
	  position: Position 
  }
  type Footer {
	  text: String
	  position: Position
  }
  enum Position {
    LEFT
    RIGHT
  }
  enum HeaderPriority {
    FIRST
    SECOND
    THIRD
  }
  type Post {
    title: String
    content: String
    author: Author
  }
  type Author {
    name: String
    dob: String
    location: Location
  }
  type Location {
    name: String
    latitude: Float
    logitude: Float
  }
`;

const resolvers = {
	Query: {
		posts: () => {
			return [{
				title: 'Hello World!',
				content: 'Content',
				author: {
					name: 'Grace Han',
					dob: '1990-05-13',
					location: {
						name: 'Wuhan',
						latitude: 123123,
						longitude: 123123,
					}
				},
			}]
		},
		header: () => {
			return {
				text: 'Welcome to our website!',
				priority: 'FIRST',
				position: 'LEFT',
			}
		},
		footer: () => {
			return {
				text: 'Company info',
				position: 'RIGHT',
			}
		}
	}
}

const server = new ApolloServer({ typeDefs: schema, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
