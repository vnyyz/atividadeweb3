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
}