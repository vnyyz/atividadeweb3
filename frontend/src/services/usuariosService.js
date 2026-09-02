import api from './api';

export const getUsuarios = async(search = '') =>{
    const response = await api.get("/usuarios", {
        params: {search},
    });
    return response.data
};

export const getUsuario = async (id) =>{
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
};