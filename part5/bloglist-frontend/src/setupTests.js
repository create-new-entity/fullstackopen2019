let savedItems = {};

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item;
  },
  getItem: (key) => savedItems[key],
  clear: () => {
    savedItems = {};
  }
};

localStorageMock.setItem('user', {});
localStorageMock.setItem('blogs', []);

Object.defineProperty(window, 'localStorage', { value: localStorageMock })