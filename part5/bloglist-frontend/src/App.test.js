import React from 'react';
import { render,  waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';
import dummyData from './dummyData';


describe('<App/>', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('If no user is logged in, blogs are not rendered', async () => {
    const component = render(
      <App/>
    );
    component.rerender(<App/>);
    await waitForElement(
      () => component.getByText('Login')
    );
    const loginForm = component.container.querySelector('.loginForm');
    expect(loginForm).toBeDefined();
    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(0);
  });

  test('If a user is logged in, blogs are rendered', async () => {
    localStorage.setItem('user', JSON.stringify(dummyData.dummyUser));
    localStorage.setItem('blogs', JSON.stringify(dummyData.dummyBlogs));

    const component = render(
      <App/>
    );
    component.rerender(<App/>);
    await waitForElement(
      () => component.container.querySelector('.blog')
    );

    let blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(2);
  });
});