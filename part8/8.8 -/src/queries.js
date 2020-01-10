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
query getAllBooks {
  allBooks {
    title
    published
    author {
      name
      born
    }
    genres
    id
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

export const SET_BORN = gql`
mutation editAuthor ($name: String!, $setBornTo: Int!) {
  editAuthor(name:$name, setBornTo:$setBornTo){
    name
    born
  }
}`;

export const LOGIN = gql`
mutation login ($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ){
    value
  }
}
`;
