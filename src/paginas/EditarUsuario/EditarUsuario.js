import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./EditarUsuario.module.css";
import { useEffect, useState } from "react";
import UsuarioAPI from "../../services/usuarioAPI";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";


export function EditarUsuario()
{
    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [TiposUsuarios, setTiposUsuarios] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid())
        {
            await UsuarioAPI.atualizarAsync(id, nome, email, tipoUsuario);
            navigate('/usuarios');
        }
        else
        {
            alert("Por favor, preencha todos os campos.");
        }
    }

    useEffect(() => {
        const buscarTiposUsuarios = async () => {
            try
            {
                const tipos = await UsuarioAPI.listarTiposUsuariosAsync();
                setTiposUsuarios(tipos);
            }
            catch (error)
            {
                console.error("Erro ao buscar os tipos de usuário:", error);
            }
        };

        const buscarDadosUsuario = async () => {
            try
            {
                const usuario = await UsuarioAPI.obterAsync(id);
                setTipoUsuario(usuario.tipoUsuario)
                setNome(usuario.nome)
                setEmail(usuario.email)
            }
            catch (error)
            {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        }

        buscarDadosUsuario();
        buscarTiposUsuarios();
    }, []);


    const isFormValid = () => {
        return nome && email && tipoUsuario;
    };


    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Usuário</h3>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup controlId="formNome" className="mb-3">
                            <FormLabel>Nome</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Digite seu nome"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </FormGroup>

                         <FormGroup controlId="formEmail" className="mb-3">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type="email"
                                placeholder="Digite seu email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormGroup>

                        <FormGroup controlId="formTipoUsuario" className="mb-3">
                            <FormLabel>Tipo de Usuário</FormLabel>
                            <FormControl
                                as="select"
                                name="tipoUsuario"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                                required
                            >
                                { Object.entries(TiposUsuarios).map(([nome, id]) => (
                                    <option key={nome} value={id}>{nome}</option>
                                ))}
                            </FormControl>
                        </FormGroup>

                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>
                    </Form>
                </div>
            </Topbar>
        </Sidebar>
    )
}
