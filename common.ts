type ActionType = "start" | "stop" | "reset"
export type GroupItem = [string, ActionType];

export interface TimerComponent {
  start: () => void;
  stop: () => void;
  reset: (duration: number) => void;
}

export type Callback = (remain: number) => void
