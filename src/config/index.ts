import dotenv from "dotenv";
import configurations from "./config.json";

dotenv.config();

interface settingsInfo {
  stagging: {
    server: {
        host: string;
        port: string;
      };
      database : {
          dbURI : string
      };
      jwt:{
        secretKey :string
      }
  };
  development: {
    server: {
      host: string;
      port: string;
    };
    database : {
        dbURI : string
    };
    jwt:{
      secretKey :string
    }
  };
}

const settings :settingsInfo  = configurations;
const env = process.env.NODE_ENV as keyof settingsInfo ;
process.env.PORT = settings[env].server.port

export default settings[env]
