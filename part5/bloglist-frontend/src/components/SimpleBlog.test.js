import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('Testing SimpleBlog Component', () => {
  let component;
  const testBlog = {
    title: 'Testing',
    author: 'Tester',
    likes: 0
  };
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={testBlog} onClick={mockHandler}></SimpleBlog>
    );
  });

  test('Title is rendered', () => {
    const headerDiv = component.container.querySelector('.title-author');
    expect(headerDiv).toHaveTextContent(testBlog.title);
  });

  test('Author is rendered', () => {
    const headerDiv = component.container.querySelector('.title-author');
    expect(headerDiv).toHaveTextContent(testBlog.author);
  });

  test('Likes are rendered', () => {
    const likeDiv = component.container.querySelector('.likes');
    expect(likeDiv).toHaveTextContent(testBlog.likes);
  });
});


