import { HTTPCLIENT } from "./client";

const UsuarioAPI = {
    async obterAsync(usuarioId)
    {
        try
        {
            const response = await HTTPCLIENT.get(`/Usuario/Obter/${usuarioId}`);
            return response.data;
        }
        catch (error)
        {
            console.error("Erro ao obter usuário:", error);
            throw error;
        }
    },
    async listarAsync(ativos)
    {
        try
        {
            const response = await HTTPCLIENT.get(`/Usuario/Listar?ativos=${ativos}`);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao listar usuários:", error);
            throw error;
        }
    },
    async criarAsync(nome, email, senha, tipoUsuario)
    {
        try
        {
            const usuarioCriar = {
                Nome: nome,
                Email: email,
                Senha: senha,
                TipoUsuario: tipoUsuario
            };
            const response = await HTTPCLIENT.post(`/Usuario/Criar`, usuarioCriar);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    },
    async atualizarAsync(id, nome, email)
    {
        try
        {
            const usuarioAtualizar = {
                Id: id,
                Nome: nome,
                Email: email
            };
            const response = await HTTPCLIENT.put(`/Usuario/Atualizar`, usuarioAtualizar);
            return response.data;
        }
        catch (error)
        {
            console.error("Erro ao atualizar usuário:", error);
            throw error;
        }
    },
    async deletarAsync(usuarioId)
    {
        try
        {
            const response = await HTTPCLIENT.delete(`/Usuario/Deletar/${usuarioId}`);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao deletar usuário:", error);
            throw error;
        }
    },
    async listarTiposUsuariosAsync()
    {
        try
        {
            const response = await HTTPCLIENT.get(`/Usuario/ListarTipoUsuarios`)
            return response.data;
        }
        catch(error)
        {
          console.error("Erro ao listar tipos de usuários:", error);
          throw error;
        }
    },
    async alterarSenhaAsync(id, senha, senhaAntiga)
    {
        try
        {
            const usuarioAlterarSenha = {
                Id: id,
                Senha: senha,
                SenhaAntiga: senhaAntiga
            };
            const response = await HTTPCLIENT.put(`Usuario/AlterarSenha`, usuarioAlterarSenha);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao alterar a senha do usuário:", error);
            throw error;
        }
    },
    async restaurarAsync(usuarioId)
    {
        try
        {
            const response = await HTTPCLIENT.put(`/Usuario/Restaurar/${usuarioId}`);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao restaurar usuário:", error);
            throw error;
        }
    }
}

export default UsuarioAPI;