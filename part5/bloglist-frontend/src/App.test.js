import React from 'react';
import { render,  waitForElement } from '@testing-library/react';
import App from './App';


describe('<App/>', () => {
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
});