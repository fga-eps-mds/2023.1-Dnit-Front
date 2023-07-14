const localStorageMock = (() => {
  let store: any = {};

  return {
    getItem: (key: any) => store[key],
    setItem: (key: any, value: any) => {
      store[key] = value.toString();
    },
    removeItem: (key: any) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

export default localStorageMock;
