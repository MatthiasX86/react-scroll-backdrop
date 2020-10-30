import { createContext } from "react";
import { BDMinValues, BDValues, BDOptions } from './app';

export interface ContextValues {
  register: (values: BDValues, options: BDOptions) => void | undefined;
  remove: (id: string) => void | undefined;
  current:  BDValues | undefined;
  previous: BDValues | undefined;
}

export const BackdropContext = createContext<ContextValues>({
  register: undefined,
  remove: undefined,
  current: undefined,
  previous: undefined,
});
