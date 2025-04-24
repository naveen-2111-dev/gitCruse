import { program } from "commander";
import { Init } from "./commands/init";

program
  .name("gitcruse")
  .description("Cruise control for your GitHub pushes")
  .version("1.0.0");

program.addCommand(Init);

export default program;
