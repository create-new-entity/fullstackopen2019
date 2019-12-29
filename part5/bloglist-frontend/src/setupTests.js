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

localStorageMock.setItem('user', JSON.stringify({}));
localStorageMock.setItem('blogs', JSON.stringify([]));

Object.defineProperty(window, 'localStorage', { value: localStorageMock });