const usuarioService = require('../services/usuarioService');

const buscarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obterTodosUsuarios();
    res.status(200).json({ data: usuarios });
  } catch (err) {
    res.status(500).json({ err: 'Erro interno ao buscar usuários' });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obterUsuarioPorId(req.params.id);

    if (!usuario) {
      return res.status(404).json({ err: 'Usuário não encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao buscar usuário' });
  }
};

const criarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.criarUsuario(req.body);
    return res.status(201).json(usuario);
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao criar usuário' });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.atualizarUsuario(req.params.id, req.body);

    if (!usuario) {
      return res.status(404).json({ err: 'Usuário não encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao atualizar usuário' });
  }
};

const excluirUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.excluirUsuario(req.params.id);

    if (!usuario) {
      return res.status(404).json({ err: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Usuário excluído com sucesso', usuario });
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao excluir usuário' });
  }
};

module.exports = {
  buscarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
};