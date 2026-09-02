import { useEffectEvent, useState } from "react";
import { getUsuarios } from "../../services/usuariosService";

function Usuarios(){
    const [usuarios, setUsuarios] = useState([]);

    useEffect(()=>{
        const fetchUsuarios = async () => {
            try{
                const dados = await getUsuarios();
                console.log(dados)
                setUsuarios(dados.data);
            } catch(err){
                console.log(err)
            }
        };
        fetchUsuarios();
    },[]);  
    return(
        <div className="page-conteiner">
            <h1>Lista de Usuarios</h1>

            <ul>
                {usuarios.map(user =>(
                    <li key={user.id}>
                        <span>{user.nome}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}