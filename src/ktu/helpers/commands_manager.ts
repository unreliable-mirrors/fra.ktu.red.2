import { ICommand } from "../../editor/commands/icommand";

const commandsQueue: ICommand[] = [];

export function executeCommand(command: ICommand) {
  command.execute();
  commandsQueue.push(command);
}

export function undoCommand() {
  const command = commandsQueue.pop();
  if (command) {
    command.revert();
  }
}
