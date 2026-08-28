import { Card } from "react-bootstrap";
import { motion } from "motion/react";
import type { DadosCard } from "../schemas/CardSchema";
import { useKanban } from "../hooks/useContext";

type Props = {
    id: "feito" | "fazendo" | "pendente";
    titulo: string;
    cor: "success" | "warning" | "danger";
    dados: DadosCard[];
    colunaRef: React.RefObject<HTMLDivElement | null>;
    refsColunas: {
        pendente: React.RefObject<HTMLDivElement | null>;
        fazendo: React.RefObject<HTMLDivElement | null>;
        feito: React.RefObject<HTMLDivElement | null>;
    };
};

export function Kabhan({ titulo, cor, dados, id, colunaRef, refsColunas }: Props) {
    const { dispatch } = useKanban();
    return (
        <Card ref={colunaRef} className="mt-3 col-9 col-md-3 ">
            <Card.Body>
                <Card.Title className={`text-center fw-bold text-${cor} fs-2 border border-${cor}   `}>{titulo}</Card.Title>
                {dados.map((e) => {
                    return (
                        <motion.div
                        key={e.id}
                            drag
                            dragSnapToOrigin
                            style={{
                                position: "relative",
                                zIndex: 1,
                            }}
                            whileDrag={{
                                zIndex: 9999,
                                scale: 1.05,
                            }}
                            onDragEnd={(_, info) => {

                                const colunas = [
                                    {
                                        id: "pendente",
                                        ref: refsColunas.pendente
                                    },
                                    {
                                        id: "fazendo",
                                        ref: refsColunas.fazendo
                                    },
                                    {
                                        id: "feito",
                                        ref: refsColunas.feito
                                    }
                                ];

                                const colunaDestino = colunas.find(coluna => {
                                    const rect = coluna.ref.current?.getBoundingClientRect();

                                    if (!rect) return false;

                                    return (
                                        info.point.x >= rect.left &&
                                        info.point.x <= rect.right &&
                                        info.point.y >= rect.top &&
                                        info.point.y <= rect.bottom
                                    );
                                });

                                if (!colunaDestino) {
                                    return;
                                }

                                dispatch({
                                    type: "MOVER_CARD",
                                    cardId: e.id,
                                    colunaOrigem: id,
                                    colunaDestino: colunaDestino.id
                                });
                            }}
                        >

                            <Card className="mt-3 p-0 card-hover" key={e.id}>
                                <Card.Body className="p-0">
                                    <Card.Title className={`bg-${cor} bg-opacity-25 m-0 p-3 fw-bold text-body-emphasis`}>{e.title}</Card.Title>
                                    <Card.Text className={`bg-${cor} m-0 p-3 fw-bold text-light`}>{e.descricao}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    )
                })}
            </Card.Body>
        </Card>
    )
}