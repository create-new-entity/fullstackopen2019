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
