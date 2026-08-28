import type { State } from "../context/MudancaProvider";

const KEY = "kabhan_dados";

export function salvarColunas(colunas: State) {
    localStorage.setItem(KEY, JSON.stringify(colunas));
}

export function buscarColunas(): State | null {
    const dados = localStorage.getItem(KEY);

    if (!dados) {
        return null;
    }

    return JSON.parse(dados);
}