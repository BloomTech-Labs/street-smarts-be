// Update with your config settings.
module.exports = {

  testing: {
    client: 'sqlite',
    useNullAsDefault: true,
    connection: {
      filename: "./data/testing.db",
    },
    migrations: {
      directory: "./data/migrations"
    }
  },
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    }
  }

};
