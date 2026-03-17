function mudarTema(cor) {
    document.documentElement.style.setProperty('--bg-principal', '#'+cor)
    // document.documentElement.style.setProperty('--bg-pricipal', '#F00')
}


let cliente;
let endereco;
let produto;
let valor;
let parcelas;
let emissao;
let vencimento;

let inputCliente = document.getElementById("inputCliente")
let inputEndereco =  document.getElementById("inputEndereco")
let inputProduto =  document.getElementById("inputProduto")
let inputValor =  document.getElementById("inputValor")
let inputParcelas =  document.getElementById("inputParcelas")
let inputEmissao =  document.getElementById("inputEmissao")
let inputVencimento =  document.getElementById("inputVencimento")

let page =  document.getElementById("page")



document.addEventListener("DOMContentLoaded", function() {
    // let hoje = new Date()
    // let ano = hoje.getFullYear()
    // let mes = String(hoje.getMonth() + 1).padStart(2, '0')
    // let dia = String(hoje.getDate()).padStart(2,'0')

    // let hojeBrasil = `${ano}-${mes}-${dia}`
    inputEmissao.value = getDataHoje()
})

function getDataHoje() {
    let hoje = new Date()
    let ano = hoje.getFullYear()
    let mes = String(hoje.getMonth() + 1).padStart(2, '0')
    let dia = String(hoje.getDate()).padStart(2,'0')

    let hojeBrasil = `${ano}-${mes}-${dia}`
    return hojeBrasil
}

function validarForm() {
    if(cliente == "" ||
        endereco == "" ||
        produto == "" ||
        valor <=0 ||
        parcelas <= 0 ||
        isNaN(emissao.getTime()) ||
        isNaN(vencimento.getTime())
    ){
        alert("Preencha todos os campos com valores válidos!")
        return false;
    }else{
        return true
    }
}

function setVariaveis() {
    cliente = inputCliente.value
    endereco = inputEndereco.value
    produto = inputProduto.value
    valor = limparMoeda(inputValor.value)
    // valor = parseFloat(inputValor.value.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.'));
    parcelas = inputParcelas.value
    emissao = inputEmissao.value
    emissao = new Date(inputEmissao.value + "T00:00:00")
    vencimento = new Date(inputVencimento.value + "T00:00:00")
}

function resetar() {
    inputCliente.value = ""
    inputEndereco.value = ""
    inputProduto.value = ""
    inputValor.value = ""
    inputParcelas.value = ""
    inputEmissao.value = getDataHoje()
    inputVencimento.value = ""

    page.innerHTML = `
        <div class="pre-carne">
            <span>📄Nenhum carnê gerado!</span>
        </div>
    `
}

function nextVencimento(dataRecebida, incremento) {
    let nextVencimento = new Date(dataRecebida)
    nextVencimento.setMonth(nextVencimento.getMonth() + incremento)

    if (nextVencimento.getDate() != vencimento.getDate()){
        nextVencimento.setDate(0)
        return nextVencimento
    }

    return nextVencimento
}

function formatarParaMoeda(elemento) {
    let value = elemento.value;
    
    value = limparMoeda(value)

    // value = value.replace(/\D/g, '');
    // value = (value / 100).toFixed(2);
    
    elemento.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatarNumberParaMoeda(valor) {
    let moedaFormatada = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return moedaFormatada
}

function limparMoeda(moeda){
    let valor = moeda

    valor = valor.replace(/\D/g, "");
    valor = Number(valor / 100).toFixed(2)
    valor = parseFloat(valor)

    return valor;
}

function gerarCarne() {
    setVariaveis()
    if(!validarForm()){return}

    // page.innerHTML = ""
    
    page.innerHTML = `
        <div class="folha folha-apresentacao">
            <div class="margin-left">
                <div class=""></div>
            </div>
            <div class="bloco1">
                <p>
                    <b class="title">GINA MÓVEIS</b><br>
                    <span class="bold500">Endereço: </span>Q.139, C.15, Av Joaquim Nelson, Dirceu Arcoverde I<br>
                    <span class="bold500">Alberto: </span>(86) 99425-0996 &emsp; &emsp;<span class="bold500">Gina: </span>(86) 99959-4244<br>
                    <span class="bold500">CNPJ: </span>04.570.475/0001-74
                </p>
                <p>
                    <b class="title">CLIENTE</b><br>
                    <span class="bold500">Nome: </span>${cliente}<br>
                    <span class="bold500">Endereço: </span>${endereco}<br>
                </p>
                <p>
                    <b class="title">PRODUTO</b><br>
                    <span class="bold500">Item: </span>${produto}<br>
                    <span class="bold500">Data de Emissão: </span>${emissao.toLocaleDateString("pt-BR")} &emsp;
                    <span class="bold500">1º Vencimeto: </span>${vencimento.toLocaleDateString("pt-BR")}<br>
                    <span class="bold500">Parcelas: </span>${parcelas} x ${formatarNumberParaMoeda(valor/parcelas)}
                </p>
            </div>

            <div class="bloco2">
                <p>Evite juros e pague em dia pelo QR Code abaixo.</p>
                <img src="qrcode.jpeg" alt="">
                <p>CAIXA ECONÔMICA</br> GINA MÓVEIS</br>CHAVE PIX: CNPJ 04570475000174</p>
            </div>
        </div>
    `

    let proximoVencimento = new Date(vencimento)
                         
        for (let index = 0; index < parcelas; index++) {
            // alert(proximoVencimento.toLocaleDateString('pt-BR'))
        page.innerHTML += `
            <div class="folha">
                <div class="margin-left">
                    <div class="">${index+1}</div>
                </div>
                <div class="bloco">
                    <div class="campo-input item0">GINA MÓVEIS</div>
                    <div class="campo-input item1">
                        <input type="text" value="${cliente}" style="pointer-events: none">
                        <label>Cliente</label>
                    </div>
                    <div class="campo-input item2">
                        <input type="text" value="${endereco}">
                        <label>Endereço</label>
                    </div>
                    <div class="campo-input item3">
                        <input type="text" value="${produto}">
                        <label>Produto</label>
                    </div>
                    <div class="campo-input item4">
                        <input type="text" value="${index+1}/${parcelas}">
                        <label>Parcelas</label>
                    </div>
                    <div class="campo-input item5">
                        <input type="text" value="${emissao.toLocaleDateString('pt-BR')}">
                        <label>Data de Emissão</label>
                    </div>
                    <div class="campo-input item6">
                        <input type="text" value="${proximoVencimento.toLocaleDateString('pt-BR')}">
                        <label>Data Vencimento</label>
                    </div>
                    <div class="campo-input item7">
                        <input type="text" value="${formatarNumberParaMoeda(valor/parcelas)}">
                        <label>Valor Parcela</label>
                    </div>
                    <div class="campo-input item8">
                        <input type="text" value="">
                        <label>Juros/Desconto</label>
                    </div>
                    <div class="campo-input item9">
                        <input type="text" value="">
                        <label>Valor Pago</label>
                    </div>
                </div>

                <div class="bloco">
                    <div class="campo-input item0">GINA MÓVEIS</div>
                    <div class="campo-input item1">
                        <input type="text" value="${cliente}" style="pointer-events: none">
                        <label>Cliente</label>
                    </div>
                    <div class="campo-input item2">
                        <input type="text" value="${endereco}">
                        <label>Endereço</label>
                    </div>
                    <div class="campo-input item3">
                        <input type="text" value="${produto}">
                        <label>Produto</label>
                    </div>
                    <div class="campo-input item4">
                        <input type="text" value="${index+1}/${parcelas}">
                        <label>Parcelas</label>
                    </div>
                    <div class="campo-input item5">
                        <input type="text" value="${emissao.toLocaleDateString('pt-BR')}">
                        <label>Data de Emissão</label>
                    </div>
                    <div class="campo-input item6">
                        <input type="text" value="${proximoVencimento.toLocaleDateString('pt-BR')}">
                        <label>Data Vencimento</label>
                    </div>
                    <div class="campo-input item7">
                        <input type="text" value="${formatarNumberParaMoeda(valor/parcelas)}">
                        <label>Valor Parcela</label>
                    </div>
                    <div class="campo-input item8">
                        <input type="text" value="">
                        <label>Juros/Desconto</label>
                    </div>
                    <div class="campo-input item9">
                        <input type="text" value="">
                        <label>Valor Pago</label>
                    </div>
                </div>

            </div>
        `
        

        proximoVencimento = nextVencimento(vencimento, index+1)
    }
}
