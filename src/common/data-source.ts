import { ConfigService } from "@nestjs/config";
import { dataSourceOptions } from "./ormconfig";
import { DataSource } from "typeorm";

export const dataSource = new DataSource(
  dataSourceOptions(new ConfigService()),
);
