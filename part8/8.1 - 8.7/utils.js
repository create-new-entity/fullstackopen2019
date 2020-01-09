require('dotenv').config();
const Author = require('./models/Author');
const Book = require('./models/Book');
const mongoose = require('mongoose');

let authors = [
  {
    name: 'Robert Martin',
    born: 1952
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky'
  },
  { 
    name: 'Sandi Metz'
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
]


const initializeBooksAndAuthors = () => {

  mongoose.set('useFindAndModify', false);
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    });

if(mongoose.connection.collections['authors']){
  mongoose.connection.collections['authors'].drop( function(err) {
    console.log('authors dropped');
  });
}

if(mongoose.connection.collections['books']){
  mongoose.connection.collections['books'].drop( function(err) {
    console.log('books dropped');
  });
}


  Promise.all(authors.map((author) => {
    author = new Author(author);
    return author.save();
  })).then((authors) => {
    console.log('authors initialized');
    Promise.all(books.map((book) => {
      let author = authors.find(author => author.name === book.author);
      book.author = author._id;
      book = new Book(book);
      return book.save();
    })).then(books => {
      console.log('books initialized');
      mongoose.connection.close();
    });
  });


};

initializeBooksAndAuthors();
