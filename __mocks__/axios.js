module.exports = {
  get: jest.fn(() => Promise.reject({ data: {}, status: 455 })),
  post: jest.fn(() => Promise.reject({ data: {}, status: 455 })),
};
