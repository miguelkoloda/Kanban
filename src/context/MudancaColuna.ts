import { createContext } from "react";
import type { Action, State } from "./MudancaProvider";

type MudancaColuna = {
    state: State;
  dispatch: React.Dispatch<Action>;
}

export const mudancaColuna = createContext<MudancaColuna | undefined>(undefined);


