import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
    formSchema,
    type FormData,
    type DadosCard
} from "../schemas/CardSchema";
import { useKanban } from "../hooks/useContext";

type Props = {
    show: boolean;
    fechar: () => void;
};


export function ModalForm({ show, fechar }: Props) {

    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    })

        const { dispatch } = useKanban();

    function formSubmit(dados: FormData) {
        const card: DadosCard = {
            id: crypto.randomUUID(),
            ...dados
        };

           dispatch({
        type: "ADICIONAR_CARD",
        colunaId: dados.tipo,
        card
    });
        fechar();
    }
    return (
        <Modal show={show} onHide={fechar}>
            <form onSubmit={handleSubmit(formSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro</Modal.Title>
                </Modal.Header>

                <Modal.Body className="d-flex flex-column gap-2">
                    <label htmlFor="title">Titulo:</label>
                    <input type="text" {...register("title")} />

                    <label htmlFor="descricao">Descrição:</label>
                    <input type="text" {...register("descricao")} />

                    <label htmlFor="tipo">Tipo:</label>
                    <select id="tipo" {...register('tipo')}>
                        <option value="feito">Feito</option>
                        <option value="fazendo">Fazendo</option>
                        <option value="pendente">Pendente</option>
                    </select>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={fechar}>
                        Fechar
                    </Button>

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}