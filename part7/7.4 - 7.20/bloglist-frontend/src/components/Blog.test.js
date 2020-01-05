import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Tests for Blog component', () => {
  let component;
  const testBlog = {
    title: 'The Alchemist',
    author: 'Paulo Cuelho',
    url: 'https://en.wikipedia.org/wiki/The_Alchemist_(novel)',
    user: {
      name: 'Tolkien'
    }
  };
  const mockLikeHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  let mockRenderDelete = false;

  beforeEach(() => {
    component = render(
      <Blog blog={testBlog} likeHandler={mockLikeHandler} deleteHandler={mockDeleteHandler} renderDelete={mockRenderDelete}/>
    );
  });

  test('Initially only Title and Author is shown', () => {
    const titleAuthorDiv = component.container.querySelector('.title-author');
    const urlLikeDiv = component.container.querySelector('.url-like');
    expect(titleAuthorDiv).toHaveStyle('display: block');
    expect(urlLikeDiv).toHaveStyle('display: none');
  });

  test('When clicked on title, other information become visible', () => {
    const titleAuthorDiv = component.container.querySelector('.title-author');
    const urlLikeDiv = component.container.querySelector('.url-like');
    expect(titleAuthorDiv).toHaveStyle('display: block');
    expect(urlLikeDiv).toHaveStyle('display: none');

    fireEvent.click(titleAuthorDiv);

    expect(titleAuthorDiv).toHaveStyle('display: block');
    expect(urlLikeDiv).toHaveStyle('display: block');
  });
});