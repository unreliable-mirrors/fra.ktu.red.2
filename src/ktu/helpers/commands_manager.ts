import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "../../editor/commands/icommand";

const getCommandsQueue = () => {
  let queue = DataStore.getInstance().getStore("commandsQueue") as
    | ICommand[]
    | undefined;
  if (!queue) {
    queue = [];
    DataStore.getInstance().setStore("commandsQueue", queue);
  }
  return queue;
};

const getRedoQueue = () => {
  let queue = DataStore.getInstance().getStore("redoQueue") as
    | ICommand[]
    | undefined;
  if (!queue) {
    queue = [];
    DataStore.getInstance().setStore("redoQueue", queue);
  }
  return queue;
};

export function executeCommand(command: ICommand) {
  console.log("Executing command:", command);
  command.execute();
  if (command.undoable !== false) {
    getCommandsQueue().push(command);
    DataStore.getInstance().touch("commandsQueue");
    clearRedo();
  }
}

export function undoCommand(untilCommand?: ICommand) {
  let command = getCommandsQueue().pop();
  if (command) {
    command.revert();
    getRedoQueue().push(command!);
  }
  console.log("Undoing command:", command, "until:", untilCommand);
  while (untilCommand && command !== untilCommand) {
    command = getCommandsQueue().pop();
    if (command) {
      command.revert();
      getRedoQueue().push(command!);
    }
  }
  DataStore.getInstance().touch("commandsQueue");
  DataStore.getInstance().touch("redoQueue");
}

export function redoCommand(untilCommand?: ICommand) {
  let command = getRedoQueue().pop();
  if (command) {
    command.execute();
    getCommandsQueue().push(command!);
  }
  while (untilCommand && command !== untilCommand) {
    command = getRedoQueue().pop();
    if (command) {
      command.execute();
      getCommandsQueue().push(command!);
    }
  }
  DataStore.getInstance().touch("redoQueue");
  DataStore.getInstance().touch("commandsQueue");
}

export function canUndo(): boolean {
  return getCommandsQueue().length > 0;
}

export function canRedo(): boolean {
  return getRedoQueue().length > 0;
}

export function clearCommands() {
  getCommandsQueue().length = 0;
  DataStore.getInstance().touch("commandsQueue");
}

export function clearRedo() {
  getRedoQueue().length = 0;
  DataStore.getInstance().touch("redoQueue");
}
