let livros = [
    { id: 1, titulo: "shazan", autor: 'da vince', disponivel: true },
    { id: 2, titulo: "vingadores", autor: 'peter parker', disponivel: true },
    { id: 3, titulo: "o pequeno principe", autor: 'di caprio', disponivel: true }
];

export function mostrar(){
    return livros
}

export function mostrarcom(id){
    const idNumero = Number(id);
    
    if (isNaN(idNumero)) return null;

    const livroEncontrado = livros.find(livro => livro.id === idNumero);

    return livroEncontrado || null;
}

export function adicionar(titulo, autor){
    if(titulo && autor){
        livros.push({id:livros.length+1, titulo, autor, disponivel:true})
        return 201
    }else return 404
}

export function emprestar(x){
    const id = Number(x);
    
    if (isNaN(id) || id < 1 || id > livros.length){
        return 'nao encontrado';
    }
    else if(livros[id-1].disponivel === false){
        return 'emprestado';
    }
    else {
        livros[id-1].disponivel = false 
        return 200
    }
}

export function devolver(x){
    const id = Number(x);
    
    if (isNaN(id) || id < 1 || id > livros.length){
        return 'nao encontrado';
    }
    else if(livros[id-1].disponivel === true){
        return 'devolvido';
    }
    else {
        livros[id-1].disponivel = true 
        return 200
    }
}

import { tokens } from "./tokens.js";
export function deletar(x, y){
    const id = Number(x);
    const token = Number(y);
    const lista = tokens()
    
    if (isNaN(id) || livros.some(livros => livros.id === id) === false){
        return 'nao encontrado';
    }else{
        if(lista.includes(token)){
            livros.splice(id-1, 1)
            return 200
        }else{
            return 'invalido'
        }
    }
}