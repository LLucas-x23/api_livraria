import { fastify } from "fastify"
import { tokens } from './tokens.js'
import * as funcao from "./functions.js"
const server = fastify()

server.get('/livros', (request, reply) => {

    return reply.status(200).send(funcao.mostrar())
})

server.get('/livros/:id', (request, reply) => {
    const id = request.params.id;

    const resposta = funcao.mostrarcom(id);

    if (resposta === null) {
        return reply.status(404).send({ erro: "Livro não encontrado" });
    } else {
        return reply.status(200).send(resposta);
    }
});

server.post('/livros', (request, reply) => {
    const {titulo, autor} = request.body

    return reply.status(funcao.adicionar(titulo, autor)).send()
})

server.put('/livros/:id/emprestar', (request, reply) => {
    const id = request.params.id

    const resposta = funcao.emprestar(id)

    if(resposta === 'nao encontrado'){
        return reply.status(404).send({ erro: "Livro indisponível" });
    }else if(resposta === 'emprestado'){
        return reply.status(409).send({ erro: "Livro já emprestado" });
    }else{
        return reply.status(resposta).send();
    }
})

server.put('/livros/:id/devolver', (request, reply) => {
    const id = request.params.id

    const resposta = funcao.devolver(id)

    if(resposta === 'nao encontrado'){
        return reply.status(404).send({ erro: "Livro indisponível" });
    }else if(resposta === 'devolvido'){
        return reply.status(409).send({ erro: "Livro já devolvido" });
    }else{
        return reply.status(resposta).send();
    }
})

server.delete('/livros/:id/:token', (request, reply) => {
    const id = request.params.id;
    const x = request.params.token;
    const token = Number(x);
    
    const resposta = funcao.deletar(id, token);

    if (resposta === 'nao encontrado') {
        return reply.status(404).send({ erro: "Livro indisponível" });
    } 
    
    if (resposta === 'invalido') {
        return reply.status(401).send({ erro: "Token inválido ou expirado" });
    } 
    
    return reply.status(resposta).send({ mensagem: "Livro deletado com sucesso" });
});

server.get('/tokens', ()=>{
    return tokens()
})


server.listen({
    port: process.env.PORT || 3333,
    host: '0.0.0.0'
})
