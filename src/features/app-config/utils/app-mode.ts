export enum AppMode {
  STORE = 'STORE',
  WHOLESALE = 'WHOLESALE'
}

export function getAppMode(): AppMode {
  const raw = import.meta.env.VITE_APP_MODE;
  return raw === AppMode.WHOLESALE ? AppMode.WHOLESALE : AppMode.STORE;
}

export function isStoreMode(): boolean {
  return getAppMode() === AppMode.STORE;
}

export function isWholesaleMode(): boolean {
  return getAppMode() === AppMode.WHOLESALE;
}

export function getAppModeLabel(): string {
  return getAppMode() === AppMode.WHOLESALE ? 'Wholesale' : 'Store';
}
