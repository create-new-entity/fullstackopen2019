import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
query getAllAuthors{
  allAuthors{
    name
    born
    bookCount
  }
}
`;

export const GET_ALL_BOOKS = gql`
query getAllBooks{
  allBooks{
    title
    author
    published
  }
}
`;

export const ADD_BOOK = gql`
mutation addABook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title:$title,
    author: $author,
    published: $published,
    genres: $genres
  ){
    title
    author
    published
    genres
  }
}
`;
