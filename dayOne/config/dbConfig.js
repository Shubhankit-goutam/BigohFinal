module.exports = {
  HOST: "localhost",
  USER: "bigo",
  PASSWORD: "Goutam@3733",
  DB: "bigodb",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
