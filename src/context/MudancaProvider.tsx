import { useEffect, useReducer } from "react";
import { mudancaColuna } from "./MudancaColuna";
import type { DadosCard } from "../schemas/CardSchema";
import { buscarColunas, salvarColunas } from "../util/LocalStorage";

type dadosProvider = {
    children: React.ReactNode
}

type Coluna = {
    id: string;
    titulo: string;
    cor: "success" | "warning" | "danger";
    cards: DadosCard[];
};


export type State = Coluna[];

export type Action =
    | {
        type: "MOVER_CARD";
        cardId: string;
        colunaOrigem: string;
        colunaDestino: string;
    }
    | {
        type: "ADICIONAR_CARD";
        colunaId: string;
        card: DadosCard;
    }
    | {
        type: "REMOVER_CARD";
        colunaId: string;
        cardId: string;
    };

const initialState: State = [
    {
        id: "pendente",
        titulo: "A fazer",
        cor: "danger",
        cards: [
            {
                id: "1",
                title: "Criar layout",
                descricao: "Criar o layout inicial do Kanban"
            },
            {
                id: "2",
                title: "Criar componentes",
                descricao: "Separar as colunas em componentes"
            }
        ]
    },
    {
        id: "fazendo",
        titulo: "Fazendo",
        cor: "warning",
        cards: [
            {
                id: "3",
                title: "Implementar drag",
                descricao: "Permitir arrastar os cards"
            }
        ]
    },
    {
        id: "feito",
        titulo: "Concluído",
        cor: "success",
        cards: []
    }
];

function reducer(state: State, action: Action): State {
    switch (action.type) {

        case "MOVER_CARD": {
            let cardMovido: DadosCard | undefined;

            const estadoSemCard = state.map(coluna => {
                if (coluna.id !== action.colunaOrigem) {
                    return coluna;
                }

                cardMovido = coluna.cards.find(
                    card => card.id === action.cardId
                );

                
                return {
                    ...coluna,
                    cards: coluna.cards.filter(
                        card => card.id !== action.cardId
                    )
                };
            });

            if (!cardMovido) {
                return state;
            }

            return estadoSemCard.map(coluna =>
                coluna.id === action.colunaDestino
                    ? {
                        ...coluna,
                        cards: [...coluna.cards, cardMovido]
                    }
                    : coluna
            );
        }

        case "ADICIONAR_CARD":
            return state.map(coluna =>
        coluna.id === action.colunaId
            ? {
                ...coluna,
                cards: [...coluna.cards, action.card]
            }
            : coluna
    );

        case "REMOVER_CARD":
            return state;

        default:
            return state;
    }
}

function carregarEstadoInicial(): State {
    const dadosSalvos = buscarColunas();

    if (dadosSalvos) {
        return dadosSalvos;
    }

    return initialState;
}

export default function MudancaProvider({ children }: dadosProvider) {
    const [state, dispatch] = useReducer(reducer, undefined, carregarEstadoInicial);

        useEffect(() => {
        salvarColunas(state);
    }, [state]);


    return (
        <mudancaColuna.Provider value={{ state, dispatch }}>
            {children}
        </mudancaColuna.Provider>
    )
}