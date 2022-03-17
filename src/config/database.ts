import mongoose from "mongoose";

import settings from "./index";

let database: mongoose.Connection;

export const connect = () => {
  if (database) {
    return;
  }
  mongoose.connect(settings.database.dbURI);

  database = mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
