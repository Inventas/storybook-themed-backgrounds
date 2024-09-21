export interface Background {
  name: string;
  value: string;
}

export type BackgroundMap = Record<string, Background>;

export interface Config {
  options: BackgroundMap;
  disable: boolean;
}

export type GlobalState = { value: string | undefined; grid: boolean };
export type GlobalStateUpdate = Partial<GlobalState>;