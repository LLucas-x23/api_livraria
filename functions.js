let livros = [
    { id: 1, titulo: "shazan", autor: 'da vince', estilo:'romance',  disponivel: true },
    { id: 2, titulo: "vingadores", autor: 'peter parker', estilo:'terror', disponivel: true },
    { id: 3, titulo: "o pequeno principe", autor: 'di caprio', estilo:'imaginação', disponivel: true }
]

export function mostrar(){
    return livros
}

export function mostrarcom(id){
    const idNumero = Number(id);
    
    if (isNaN(idNumero)) return null;

    const livroEncontrado = livros.find(livro => livro.id === idNumero);

    return livroEncontrado || null;
}

export function mostrar_pesquisa(x){
    const search = x
    let lista = []

    for(let i=0; i<livros.length; i++){
        if(livros[i].titulo === search || livros[i].autor === search || livros[i].estilo === search){
            lista.push(livros[i])
        }
    }

    if(lista.length === 0){
        return livros
    }else{
        return lista
    }
}

export function adicionar(titulo, autor, estilo){
    if(titulo && autor && estilo){
        livros.push({id:livros.length+1, titulo, autor, estilo, disponivel:true})
        return 201
    }else return 400
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
            for(let i = id-1; i<livros.length; i++){
                livros[i].id = i+1;
            }

            return 200
        }else{
            return 'invalido'
        }
    }
}
