
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

routes.get('/', async (req, res)=>{
   try{
        const { recordset } =  await pool.query`select * from chamados`
        return res.status(200).json(recordset)
   }
   catch(error){
        return res.status(501).json('ops...algo deu errado')
   }
}) 


routes.get('/chamado/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        const { recordset } =  await pool.query`select * from chamados where idchamada=${id}`
        return res.status(200).json(recordset)
    }
    catch(error){
        console.log(error)
         return res.status(501).json('ops...algo deu errado')
    }
 })

routes.post('/chamado/novo', async (req, res)=>{
    try{
        const { cliente, datachamada, descricao, idchamada } = req.body;
        await pool.query`insert into chamados values(${cliente},${datachamada},${descricao},${idchamada})`
        return res.status(201).json(`ok`)
    }
    catch(error){
        return res.status(501).json('erro ao inserir produto...')
    }
})

// routes.put('/chamados/:id', async (req, res)=>{
//     try {
//         const { id } = req.params
//         const { descricao, preco } = req.body
//         await pool.query`update chamados set descricao = ${descricao}, preco = ${preco} where id = ${id}`
//         return res.status(201).json('atualizado')
//     } catch (error) {
//         console.log(error)
//         return res.status(501).json('erro ao atualizar produto...')
//     }
// })

// routes.delete('/produto/:id', async (req, res)=>{
//     try {
//         const { id } = req.params
//         await pool.query`delete from chamados where id = ${id}`
//         return res.status(200).json('excluido!')
//     } catch (error) {
//         console.log(error)
//         return res.status(501).json('erro ao excluir produto...')
//     }
// })

export default routes