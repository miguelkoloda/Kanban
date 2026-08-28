import { mudancaColuna } from "../context/MudancaColuna";
import { useContext } from "react";

export function useKanban() {
    const context = useContext(mudancaColuna);

    if (!context) {
        throw new Error(
            "useKanban deve ser usado dentro de KanbanProvider"
        );
    }

    return context;
}