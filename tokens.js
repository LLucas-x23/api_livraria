let lista = [];
function gerarNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerar(){
    lista.length = 0;
    for(let i=0; i<10; i++){
        lista.push(gerarNumero(1,999))
    }
}

gerar()
setInterval(() =>{
    gerar()
}, 15000)

export function tokens(){
    return lista;
}
