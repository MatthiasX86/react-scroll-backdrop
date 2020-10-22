import {createContext} from "react";
import { BackdropValue, RegisterFn } from './logic';

export interface ContextValues {
  register: RegisterFn | undefined;
  current: BackdropValue | undefined;
  previous: BackdropValue | undefined;
}

export const BackdropContext = createContext<ContextValues>({
  register: undefined,
  current: undefined,
  previous: undefined,
});
