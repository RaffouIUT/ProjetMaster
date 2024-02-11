require("dotenv").config({path: ".env"});

import type { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: process.env.POSTGRES_URL,
  migrations: {
      extension: 'ts',
  },
};

export default config;
