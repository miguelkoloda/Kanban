import { useRef } from "react";
import { Kabhan } from "../components/kabhanModel";
import { useKanban } from "../hooks/useContext";

export function KabhanPage() {
    const { state } = useKanban();
    const pendenteRef = useRef<HTMLDivElement>(null);
    const fazendoRef = useRef<HTMLDivElement>(null);
    const feitoRef = useRef<HTMLDivElement>(null);

    const refsColunas = {
    pendente: pendenteRef,
    fazendo: fazendoRef,
    feito: feitoRef
};

    return (
        <>
            <div className="container">
                <div className="row gap-4 justify-content-center">
                    <Kabhan
                        id="pendente"
                        titulo="Pendente"
                        cor="danger"
                        dados={state[0].cards}
                        colunaRef={pendenteRef}
                        refsColunas={refsColunas}
                    />

                    <Kabhan
                        id="fazendo"
                        titulo="Fazendo"
                        cor="warning"
                        dados={state[1].cards}
                        colunaRef={fazendoRef}
                        refsColunas={refsColunas}
                    />

                    <Kabhan
                        id="feito"
                        titulo="Feito"
                        cor="success"
                        dados={state[2].cards}
                        colunaRef={feitoRef}
                        refsColunas={refsColunas}
                    />
                </div>
            </div>
        </>
    )
}