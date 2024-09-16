import AppError from "../errors/app-error";

export class UserValidator {
    public static validateCreateUser(data: any): void {
        const { name, username, email, password } = data;

        if (!name.trim()) throw new AppError("O campo 'name' é obrigatório.", 400);
        if (!username.trim()) throw new AppError("O campo 'username' é obrigatório.", 400);
        if (!email.trim()) throw new AppError("O campo 'email' é obrigatório.", 400);
        if (!password.trim()) throw new AppError("O campo 'password' é obrigatório.", 400);
    }

    public static validateUpdateUser(data: any): void {
        const { name, username, email, password } = data;

        // Verifica se pelo menos um campo foi fornecido
        if (!name && !username && !email && !password) {
            throw new AppError("Pelo menos um campo deve ser fornecido para atualização.", 400);
        }

        // Valida individualmente os campos, caso tenham sido fornecidos
        if (name !== undefined && !name.trim()) throw new AppError("O campo 'name' não pode ser vazio.", 400);
        if (username !== undefined && !username.trim()) throw new AppError("O campo 'username' não pode ser vazio.", 400);
        if (email !== undefined && !email.trim()) throw new AppError("O campo 'email' não pode ser vazio.", 400);
        if (password !== undefined && !password.trim()) throw new AppError("O campo 'password' não pode ser vazio.", 400);
    }
}
