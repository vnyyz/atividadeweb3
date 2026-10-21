import { useState, useEffect } from "react";
import {
  getUsuarios,
  getUsuario,
  updateUsuario,
  deleteUsuario,
} from "../../services/usuariosService";

const styles = {
  page: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  searchBox: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--border-color)",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
  },
  button: {
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "none",
    background: "var(--primary-color)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
  usersList: {
    listStyleType: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  userCard: {
    background: "var(--card-bg)",
    border: "1px solid var(--border-color)",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all .3s ease",
    gap: "1rem",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "4px",
  },
  userEmail: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
  },
  actionGroup: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  smallButton: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-primary)",
    cursor: "pointer",
  },
  dangerButton: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #ff5c5c",
    background: "transparent",
    color: "#ff5c5c",
    cursor: "pointer",
  },
  statusBadge: {
    background: "var(--badge-bg)",
    color: "var(--primary-color)",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  message: {
    textAlign: "center",
    color: "var(--text-secondary)",
    margin: "2rem 0",
    fontSize: "1.1rem",
  },
};

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsers(data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.err || err.message || "Erro ao buscar usuários"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const buscarPorId = async () => {
    if (!searchId) {
      fetchUsuarios();
      return;
    }

    try {
      const user = await getUsuario(searchId);
      setUsers(user ? [user] : []);
    } catch (err) {
      setError(err.response?.data?.err || "Usuário não encontrado");
    }
  };

  const handleEdit = async (user) => {
    const novoNome = window.prompt("Digite o novo nome:", user.nome || "");
    if (!novoNome) return;

    const novoEmail = window.prompt("Digite o novo email:", user.email || "");
    if (!novoEmail) return;

    try {
      await updateUsuario(user.id, {
        nome: novoNome,
        email: novoEmail,
      });
      fetchUsuarios();
    } catch (err) {
      setError(err.response?.data?.err || "Erro ao editar usuário");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Deseja realmente excluir este usuário?");
    if (!confirmDelete) return;

    try {
      await deleteUsuario(id);
      fetchUsuarios();
    } catch (err) {
      setError(err.response?.data?.err || "Erro ao excluir usuário");
    }
  };

  return (
    <div style={styles.page} className="page-container">
      <div style={styles.topBar}>
        <h1>Lista de Usuários</h1>

        <div style={styles.searchBox}>
          <input
            type="number"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={buscarPorId}>
            Buscar
          </button>
        </div>
      </div>

      {loading && <div style={styles.message}>Carregando usuários...</div>}

      {error && <div style={styles.message}>Ops! {error}</div>}

      {!loading && !error && users.length === 0 && (
        <div style={styles.message}>Nenhum usuário encontrado no momento.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <ul style={styles.usersList}>
          {users.map((user) => (
            <li key={user.id} style={styles.userCard}>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{user.nome}</span>
                <span style={styles.userEmail}>{user.email}</span>
              </div>

              <div style={styles.actionGroup}>
                <div style={styles.statusBadge}>ID #{user.id}</div>
                <button
                  style={styles.smallButton}
                  onClick={() => setSelectedUser(user)}
                >
                  Ver
                </button>
                <button
                  style={styles.smallButton}
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </button>
                <button
                  style={styles.dangerButton}
                  onClick={() => handleDelete(user.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div style={{ marginTop: "1rem", background: "var(--card-bg)", padding: "1rem", borderRadius: "12px" }}>
          <h3>Detalhes do usuário</h3>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Nome:</strong> {selectedUser.nome}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <button style={styles.button} onClick={() => setSelectedUser(null)}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}

export default Usuarios;