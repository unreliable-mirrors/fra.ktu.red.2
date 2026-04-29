export interface ShortcutEntry {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  /** Human-readable label shown in future shortcut help panels */
  description?: string;
}

class KeyboardShortcutsManager {
  private static _instance: KeyboardShortcutsManager;
  private shortcuts: ShortcutEntry[] = [];

  private constructor() {
    window.addEventListener("keydown", (e) => this.handle(e));
  }

  static getInstance(): KeyboardShortcutsManager {
    if (!KeyboardShortcutsManager._instance) {
      KeyboardShortcutsManager._instance = new KeyboardShortcutsManager();
    }
    return KeyboardShortcutsManager._instance;
  }

  register(shortcut: ShortcutEntry): void {
    this.shortcuts.push(shortcut);
  }

  unregister(action: ShortcutEntry["action"]): void {
    this.shortcuts = this.shortcuts.filter((s) => s.action !== action);
  }

  getAll(): Readonly<ShortcutEntry[]> {
    return this.shortcuts;
  }

  private handle(e: KeyboardEvent): void {
    // Never fire when the user is typing inside an input or textarea
    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      return;
    }

    for (const s of this.shortcuts) {
      if (
        e.key.toLowerCase() === s.key.toLowerCase() &&
        !!e.ctrlKey === !!s.ctrl &&
        !!e.shiftKey === !!s.shift &&
        !!e.altKey === !!s.alt
      ) {
        e.preventDefault();
        s.action();
        return;
      }
    }
  }
}

export const keyboardShortcuts = KeyboardShortcutsManager.getInstance();
