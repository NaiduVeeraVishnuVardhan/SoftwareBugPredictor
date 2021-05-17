let PORT = process.env.PORT || 3000

module.exports = {
    servers: [
      {
        url: `http://localhost:${PORT}`, // url
        description: "Local server", // name
      },
    ],
  };