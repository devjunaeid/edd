import pg from "pg";
import dbConfig from "@/config/psql.config";

const { Sequelize, DataTypes, UUID, UUIDV1 } = require("sequelize");

export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectModule: pg,
    operationsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  },
);

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
};

export const ProjectInfo = sequelize.define(
  "ProjectInfo",
  {
    project_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  },
);

export const ServiceList = sequelize.define(
  "ServiceList",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.STRING,
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    steps: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No comments!",
    },
    running: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    current_step: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  },
);

export const Stats = sequelize.define(
  "Stats",
  {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey: true,
    },
    stat_name: {
      type: DataTypes.STRING,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  },
);
