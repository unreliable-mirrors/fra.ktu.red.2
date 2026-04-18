export interface ICommand {
  execute(): void;
  revert(): void;
}
