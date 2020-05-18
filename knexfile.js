// Update with your config settings.
module.exports = {
  testing: {
    client: "sqlite",
    useNullAsDefault: true,
    connection: {
      filename: "./data/testing.db",
    },
    migrations: {
      directory: "./data/migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST_AWS,
      user: process.env.DB_USER_AWS,
      password: process.env.DB_PW_AWS,
      port: process.env.DB_PORT_AWS,
      database: process.env.DB_NAME_AWS,
    },
    migrations: {
      directory: "./data/migrations",
    },
  },
};
