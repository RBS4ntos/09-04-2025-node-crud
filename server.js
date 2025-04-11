// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'senac@02',
    database: 'rafael'
});

app.post('/api/mysql', async (req, res) => {
    const { nome, login, senha, tipo, id, dados } = req.body;
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
                    throw ('Não foi possível cadastrar o usuário!: ${pool}');
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
            case 'leitura':
                var addNome = "";
                var addLogin = "";
                var addAnd = "";
                if (nome.trim().length > 0){
                    addNome = "`nome` like '%" + nome + "%' ";
                }
                if (login.trim().length > 0){
                    addLogin = "`login` like '%" + login + "%' ";
                }
                if (nome.trim().length > 0 && login.trim().length > 0){
                    addAnd = "and";
                }
                var strSql = "select * from `rafael`.`tbl_login` where" + addNome + addAnd + addLogin + ";";
                var [rows, fields] = await pool.query(strSql);
                if (rows.length > 0) {
                    res.json({
                        message: 'Nome ou login encontrado com sucesso!',
                        id: rows[0].id,
                        nome: rows[0].nome,
                        login: rows[0].login,
                        linhas: rows.length
                    });
                } else {
                    throw ("Não foi possível encontrar o nome ou login!");
                }

                break;
            case 'atualizacao':
                var strSql = "select * from `rafael`.`tbl_login`;";
                var[rows, field] = await pool.query(strSql);
                if(rows.length > 0) {
                    res.json ({
                        message: 'Nome, login e senhas e senhas encontrados com sucesso!',
                        rows: rows
                    }); 
                } else {
                    throw ("Não há registro algum na tablea tbl_login!");
                }
                break;
            case 'atualizar':
                var addId = "";
                var addNome = "";
                var addLogin = "";
                var addSenha = "";
                var addAnd = "";

                if (id.trim().length > 0) {
                    addId = id;
                }

                if (nome.trim().length > 0) {
                    addNome = " `nome` = '" + nome + "' ";
                }

                if (login.trim().length > 0) {
                    addLogin = " `login` = '" + login + "' ";
                }

                if (addNome.length > 0) {
                    addLogin = " , " + addLogin;
                }

                if (senha.trim().length > 0) {
                    addSenha = " `senha` = '" + senha + "' "; 
                }

                if (addLogin.length > 0) {
                    addSenha = " , " + addSenha;
                }

                var strSql = "update `rafael`.`tbl_login` set" +
                    addNome + addLogin + addSenha +
                    " where `id` = " + addId + ";";
                var strSql = "update `rafael`.`tbl_login` set" +
                    addNome + addLogin + addSenha +
                    "where `id` = " + addId + ";";
                    var [rows, fields] = await pool.query(strSql);
                    if (rows.affectedRows > 0) {
                        res.json({
                            message: 'Registro atualizado com sucesso!'
                        });
                    } else {
                        throw ("Não foi possível atualizar o id: " + addId + " na tabela tbl_login!");
                    }
                break;
            case 'remocao':
                var[rows, fields] = await pool.query(
                    "delete from `rafael`.`tbl_login` where `id` = ?;",
                    [dados]
                );
                if (rows.affectedRows >= 1){
                    res.json({ message: 'Usuário deletado com sucesso!'});
                } else {
                    throw ("Não foi possível excluir o usuário");
                }
                break;
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
