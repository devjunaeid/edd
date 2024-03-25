import NextAuth from "next-auth"
import authConfig from "./auth.config"
import SequelizeAdapter, { models } from "@auth/sequelize-adapter";
import { sequelize } from "@/utils/seqalize";
import { DataTypes } from "sequelize";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  trustHost:true,
session: {strategy: "jwt"},
adapter: SequelizeAdapter(sequelize, {
  models: {
    User: sequelize.define("user", {
      ...models.User,
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
        allowNull: false,
      },
    }),
  },
}),
...authConfig,
})