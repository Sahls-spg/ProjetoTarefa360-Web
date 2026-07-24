import { Link } from "react-router-dom";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./Usuarios.module.css";
import { Table } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import UsuarioAPI from "../../services/usuarioAPI"

export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    async function carregarUsuarios() 
    {
        try
        {
            const listaUsuarios = await UsuarioAPI.listarAsync(false);
            setUsuarios(listaUsuarios);
        }       
        catch (error)
        {
            console.error("Erro ao carregar usuários:", error);
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Usuários</h3>
                        <Link to='usuario/novo' className={style.botao_novo}>+ Novo</Link>
                    </div>

                    <div className={style.tabela}>
                        <Table responsive>
                            <thead className={style.tabela_cabecalho}>
                                <tr>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <Link to='usuario/editar' state={usuario.id} className={style.botao_editar}>
                                                <MdEdit />
                                            </Link>
                                            <Link to='/usuario/deletar' state={usuario.id} className={style.botao_deletar}>
                                                <MdDelete/>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Topbar>
        </Sidebar>
    )
}