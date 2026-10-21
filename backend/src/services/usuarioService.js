let usuarios = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com' },
  { id: 2, nome: 'Maria Souza', email: 'maria@email.com' },
  { id: 3, nome: 'Pedro Lima', email: 'pedro@email.com' },
];

let proximoId = 4;

const obterTodosUsuarios = async () => usuarios;

const obterUsuarioPorId = async (id) => {
  const usuario = usuarios.find((u) => u.id === Number(id));
  return usuario || null;
};

const criarUsuario = async (dadosUsuario) => {
  const novoUsuario = {
    id: proximoId++,
    nome: dadosUsuario.nome,
    email: dadosUsuario.email,
  };

  usuarios.push(novoUsuario);
  return novoUsuario;
};

const atualizarUsuario = async (id, dadosUsuario) => {
  const index = usuarios.findIndex((u) => u.id === Number(id));

  if (index === -1) return null;

  usuarios[index] = {
    ...usuarios[index],
    nome: dadosUsuario.nome || usuarios[index].nome,
    email: dadosUsuario.email || usuarios[index].email,
  };

  return usuarios[index];
};

const excluirUsuario = async (id) => {
  const index = usuarios.findIndex((u) => u.id === Number(id));

  if (index === -1) return null;

  const [removido] = usuarios.splice(index, 1);
  return removido;
};

module.exports = {
  obterTodosUsuarios,
  obterUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
};