export interface ShortcutEntry {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  /** Human-readable label shown in future shortcut help panels */
  description?: string;
}

const isMacOS = () => /Mac|iPhone|iPad|iPod/.test(navigator.platform);

class KeyboardShortcutsManager {
  private static _instance: KeyboardShortcutsManager;
  private shortcuts: ShortcutEntry[] = [];
  private isMac = isMacOS();

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

  unregister({ key, ctrl, shift, alt }: Partial<ShortcutEntry>): void {
    this.shortcuts = this.shortcuts.filter((s) => {
      return !(
        s.key === key &&
        s.ctrl === ctrl &&
        s.shift === shift &&
        s.alt === alt
      );
    });
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

    console.log(
      "Key pressed:",
      e.key,
      "Ctrl:",
      e.ctrlKey,
      "Shift:",
      e.shiftKey,
      "Alt:",
      e.altKey,
    );

    for (const s of this.shortcuts) {
      const ctrlPressed = this.isMac ? e.metaKey : e.ctrlKey;
      if (
        e.key.toLowerCase() === s.key.toLowerCase() &&
        !!ctrlPressed === !!s.ctrl &&
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
export { isMacOS };
