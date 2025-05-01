import { program } from "commander";
import { Init } from "./commands/init";
import { CI } from "./commands/CI";
import AI from "./commands/Ai";

program
  .name("gitcruse")
  .description("Cruise control for your GitHub pushes")
  .version("1.0.0");

program.addCommand(Init);
program.addCommand(CI);
program.addCommand(AI);

export default program;
