//-----------------------------------------------------------------------------------------------------------
// Função: verificarToken
// Verifica se foi feito o login antes do acesso à página, de acordo com um código token criado no localStorage
// ao efetuar o login
// Parâmetros:
// - nenhum
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function verificarToken() {
    if (localStorage.getItem('token') == null) {
        alert('Você precisa estar logado para acessar essa página');
        window.location.href = ('../pages/login.html');
    }
}
//-----------------------------------------------------------------------------------------------------------
// Função: validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto)
// Verifica se foram informados o nome e o código do produto
// Parâmetros:
// - idNomeProduto: id do campo que contém o nome do produto
// - idCodProduto: id do campo que contém o código do produto
// - idQtidadeProduto: id do campo que contém a quantidade do produto
// OBS: Se faltar alguma informação (nome ou código do produto) aparecerá uma mensagem de erro. Em caso de 
// sucesso (todas as informações preenchidas), chama a função cadastrarProduto(...)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;
    if (nome == "") {
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    } else if (codigo == "") {
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    } else {
        cadastrarProduto(nome, codigo, parseInt(qtidade));
    }
}
//-----------------------------------------------------------------------------------------------------------
// Função: cadastrarProduto(produto, codig, qtidade)
// Cadastra um novo produto (nome, código e quantidade) no estoque
// Parâmetros:
// - produto: nome do produto a ser cadastrado no estoque (Ex: arroz)
// - codig: código do produto a ser cadastrado no estoque (Ex: a01)
// - qtidade: quantidade do produto a ser cadastrado no estoque (Ex: 7)
// OBS: Apos cadastrar o novo produto no estoque, atualiza a quantidade de itens no carrinho, ou seja, chama 
// a função atualizarTotalEstoque()
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function cadastrarProduto(produto, codig, qtidade) {
    let novoProduto = { nome: produto, codigo: codig, quantidade: qtidade };
    if (typeof (Storage) !== "undefined") {
        let estoque = localStorage.getItem("estoque");
        if (estoque == null) {
            estoque = []; // Nenhum produto ainda foi cadastrado
        }
        else {
            estoque = JSON.parse(estoque);
        }
        estoque.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("estoque", JSON.stringify(estoque))
        alert("Foram cadastradas com sucesso " + qtidade + " unidades do produto " + produto + "!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}
//-----------------------------------------------------------------------------------------------------------
// Função: atualizarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque", ++document.getElementById(idCampo).innerHTML)
}
function validarProdutoParaRemocao(idNomeProduto, idCodProduto, idQtidadeProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;
    if (nome == "") {
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    } else if (codigo == "") {
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    } else {
        removerProduto(nome, codigo, parseInt(qtidade));
    }
}
function removerProduto(produto, codig, qtidade) {
    let removerProduto = { quantidade: qtidade };
    if (typeof (Storage) !== "undefined") {
        estoque = localStorage.getItem("estoque");
        if (estoque == null) {
            alert("Não há itens cadastrados no estoque");
        } // Nenhum produto ainda foi cadastrado
        else {
            estoque = JSON.parse(estoque);
            var busca = estoque.indexOf(removerProduto);
            if (busca !== -1) {
                window.localStorage.removeItem("estoque", JSON.stringify(estoque))
                alert(+ qtidade + " unidades do produto " + produto + "foram removidas do estoque");
                removerItemEstoque("totalEstoque");
                location.reload();
            }
            else {
                alert("Não há itens cadastrados com os dados informados. Tente novamente.")
            }

        }
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}
function atualizarRemocaoEstoque(idCampo) {
    localStorage.setItem("totalEstoque", --document.getElementById(idCampo).innerHTML)
}
//-----------------------------------------------------------------------------------------------------------
// Função: carregarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no centro da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function carregarTotalEstoque(idCampo) {
    if (typeof (Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) {
            totalEstoque = 0;
        }
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}
function carregarDadosQTDItens(idCampo) {
    if (typeof (Storage) !== "undefined") {
        let removeQtd = localStorage.getItem("removeQtd");
        if (removeQtd == null) {
            removeQtd = 0;
        }
        document.getElementById(idCampo).innerHTML = removeQtd;
    }
}

//-----------------------------------------------------------------------------------------------------------
// Exibe todos os itens do estoque (nome, código e quantidade)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function listarEstoque() {
    if (typeof (Storage) !== "undefined") {
        let estoque = localStorage.getItem("estoque");
        if (estoque == null) {
            alert("OPS! Ainda não há nenhum item no estoque.");
            window.location.href = '../pages/softwareTelaPrincipal.html';
        }  
        else {

            estoque = JSON.parse(estoque);
            document.write("<h1>Estoque:</h1>")
            estoque.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Nome do produto: " + produto.nome + "</li>");
                document.write("<li>Código do produto: " + produto.codigo + "</li>");
                document.write("<li>Quantidade no estoque: " + produto.quantidade + "</li>");
                document.write("</ul>");
            });
        }
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
}

function apagarDadosEstoque() {
    if (typeof ("estoque") !== "undefined") {
        localStorage.removeItem("totalEstoque");
        localStorage.removeItem("estoque");
        carregarTotalEstoque("totalEstoque");
        location.reload();
    }
    else {
        alert("Não há dados a serem excluídos verifique seu estoque.")
    }
}

function sair() {
    localStorage.removeItem('token');
    window.location.href = ('../pages/index.html');
}