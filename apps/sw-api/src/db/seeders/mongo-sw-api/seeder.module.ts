import { Logger, Module } from "@nestjs/common";
import { SeederService } from "./seeder.service";

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [],
  providers: [Logger, SeederService],
})
export class SeederModule {}
