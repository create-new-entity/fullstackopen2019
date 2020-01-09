require('dotenv').config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

const JWT_SECRET = process.env.SECRET;

mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
});

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/



const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ):Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    
    bookCount: async () => {
      let books = await Book.find({});
      return books.length;
    },

    authorCount: async () => {
      let authors = await Author.find({});
      return authors.length;
    },

    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author');
      if(args.author) books = books.filter(book => book.author === args.author);
      if(args.genre) books = books.filter(book => book.genres.includes(args.genre));

      return books;
    },

    allAuthors: async () => {
      let authors = await Author.find({});
      return authors;
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      let books = await Book.find({});
      return books.filter((book) => {
        return book.author === root.name;
      }).length;
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser){
        throw new AuthenticationError('No user logged in.', {
          invalidArgs: {
            user: context.currentUser
          }
        });
      }
      if(args.title.length < 2){
        throw new UserInputError('Too short book title', {
          invalidArgs: args.title
        });
      }

      let book = await Book.findOne({ title: args.title });
      if(book){
        throw new UserInputError('Book already exists (title not unique)', {
          invalidArgs: args.title
        });
      }

      let author = await Author.findOne({ name: args.author});
      if(!author) {
        if(args.author.length < 4){
          throw new UserInputError('Too short author name', {
            invalidArgs: args.author
          });
        }
        let newAuthor = {
          name: args.author,
          born: null
        };
        newAuthor = new Author(newAuthor);
        author = await newAuthor.save();
      }
      
      let newBook = {
        title: args.title,
        author: author._id.toString(),
        published: args.published,
        genres: args.genres
      };
      newBook = await new Book(newBook);
      newBook = await newBook.save();
      return Book.findById(newBook._id).populate('author');
    },

    editAuthor: async (root, args, context) => {
      if(!context.currentUser){
        throw new AuthenticationError('No user logged in.', {
          invalidArgs: {
            user: context.currentUser
          }
        });
      }
      let author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      return author.save();
    },

    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'balchal' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})