import { ReactElement } from "react";

export interface Options<TData> {
  key: string | number;
  content: ReactElement | ((value: TData) => ReactElement);
  onClick?: (value: TData) => void;
}

export type ContextOption<TData> = Options<TData>;
export type DropdownActionItem<TData> = Options<TData>;
