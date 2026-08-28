import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3, "Mínimo de 3 caracteres"),
    descricao: z.string().min(10, "Mínimo de 10 caracteres"),
    tipo: z.enum(["feito", "fazendo", "pendente"]),
});

export type FormData = z.infer<typeof formSchema>;

export type DadosCard = FormData & {
    id: string;
};