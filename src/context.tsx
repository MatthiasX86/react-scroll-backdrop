import { createContext } from "react";
import { BDMinValues, BDValues, BDOptions } from './app';

export interface ContextValues {
  register: (values: BDValues, options: BDOptions) => void | undefined;
  current:  BDMinValues | undefined;
  previous: BDMinValues | undefined;
}

export const BackdropContext = createContext<ContextValues>({
  register: undefined,
  current: undefined,
  previous: undefined,
});
