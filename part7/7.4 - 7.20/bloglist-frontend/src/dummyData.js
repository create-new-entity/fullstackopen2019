const dummyUser = {
  username: 'dummyGuy',
  token: '1231231214',
  name: 'Dummy Dummy'
};

const dummyBlogs = [
  {
    title: 'dBlog 1',
    author: 'dAuthor 1',
    url: 'dummy1.com',
    likes: 1,
    user: {
      blogs: [1, 2],
      name: 'testuser',
      username: 'testuser',
      id: 'u1'
    },
    id: '1'
  },
  {
    title: 'dBlog 2',
    author: 'dAuthor 2',
    url: 'dummy2.com',
    likes: 2,
    user: {
      blogs: [1, 2],
      name: 'testuser',
      username: 'testuser',
      id: 'u1'
    },
    id: '1'
  }
];


export default {
  dummyUser,
  dummyBlogs
};
