module.exports = {
  async redirects() {
    return [
      {
        source: "/recovery",
        destination: "/",
        permanent: true,
      },
    ];
  },
  env: {
    BACK_URL: '',
  },
};
