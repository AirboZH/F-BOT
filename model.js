import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize("mydatabase", "username", "PASSWORD", {
  host: "127.0.0.1",
  dialect: "mysql",
  timezone: "+08:00",
});

const DBMovies = sequelize.define("DBMovies", {
  dbID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  chTitle: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  dbRank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dbScore: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  IMDb: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  detail: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  posterUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({force:true});
})();

export { DBMovies };
