// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serve seu index.html

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'senac@02',
    database: 'rafael'
});

app.post('/api/mysql', async (req, res) => {
    const { nome, login, senha, tipo,  dados } = req.body;
    try {
        switch (tipo){
            case 'cadastro':
                var [rows, fields] = await pool.query(
                    "insert into `rafael`.`tbl_login` (`nome`, `login`, `senha`) values (?, ?, ?);",
                    [nome, login, senha]
                );
                if (rows.affectedRows > 0) {
                    res.json({ message: 'Usuário cadastrado com sucesso!'});
                } else {
                    throw (`Não foi possível cadastrar o usuário!: ${pool}`);
                }
                break;
            case 'login':
                var [rows, fields] = await pool.query(
                    "select * from `rafael`.`tbl_login` where `nome` = ? and `login` = ? and `senha` = ?;",
                    [nome, login, senha]
                );
                if (rows.length == 1) {
                    res.json({ message: 'Usuário logado com sucesso!'});
                } else {
                    throw ("Não foi possível logar o usuário");
                }
                break;
            case 'remocao':
                var[rows, fields] = await pool.query(
                    "delete from `rafael`.`tbl_login` where `login` = ?;",
                    [dados]
                );
                if (rows.affectedRows > 1){
                    res.json({ message: 'Usuário deletado com sucesso!'});
                } else {
                    throw ("Não foi possível excluir o usuário");
                }
                default:
                    throw("Não foi possível identificar o tipo!");
        }
    } catch (err) {
        res.status(500).json({ message: `Erro: ${err}`});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
