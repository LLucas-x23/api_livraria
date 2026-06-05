let lista = [];
function gerarNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerar(){
    lista.length = 0;
    for(let i=0; i<1; i++){
        lista.push(gerarNumero(1,10))
    }
}

gerar()
setInterval(() =>{
    gerar()
}, 15000)

export function tokens(){
    return lista;
}