//-----------------------------------------------------------------------------------------------------------
// Função: sair
// Encerra a sessão do usuário ao clicar no botão localizado no cabeçalho
// Parâmetros:
// - nenhum
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------

function sair() {
    localStorage.removeItem('token');
    window.location.href = ('../index.html');
}

/*window.onunload = destruirToken; 

function destruirToken() {
    localStorage.removeItem('token');
}*/

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
function validarProduto(idIDestoque, idNomeProduto, idDescricaoProduto, idPrecoProduto, idCodProduto, idQtidadeProduto) {
    let IDestoque = document.getElementById(idIDestoque).value;
    let nome = document.getElementById(idNomeProduto).value;
    let descricaoProduto = document.getElementById(idDescricaoProduto).value;
    let precoProduto = document.getElementById(idPrecoProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    let estoque = JSON.parse(localStorage.getItem("estoque"));
    let verificar = 0;

    estoque.forEach((item) =>{
        if(IDestoque == item.IDDoestoque) {
            alert("ID já cadastrado. Favor preencher um ID Diferente!");
            verificar = 1;
        }
    });
    
    if (IDestoque == "") {
        alert("ID do estoque não pode ficar em branco não pode estar em branco. Favor preenchê-lo!");
        verificar = 1;
    }

    else if (nome == "") {
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
        verificar = 1;
    }

    else if (precoProduto == "") {
        alert("O preço unitário não pode estar em branco. Favor preenchê-lo!");
        verificar = 1;
    } 

    else if (precoProduto <= 0) {
        alert("Valor do preço unitário inválido. Favor verificá-lo!");
        verificar = 1;
    }

    else if (codigo == "") {
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
        verificar = 1;
    } 

    else if (qtidade == "") {
        alert("A quantidade do produto não pode estar em branco. Favor preenchê-lo!");
        verificar = 1;
    }

    else if (qtidade <= 0) {
        alert("A quantidade precisa ser maior que 0");
        verificar = 1;
    }

    if (verificar == 0) {
        let precoProdutoFloat = parseFloat(precoProduto);
        let qtidadeInt = parseInt(qtidade);
        let valorEstoqueInicial = precoProdutoFloat * qtidadeInt;
        cadastrarProduto(IDestoque, nome, descricaoProduto, precoProdutoFloat, codigo, qtidadeInt,valorEstoqueInicial);
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
function cadastrarProduto(IDestoque, produto, descricaoProduto, precoProduto, codig, qtidade, valorEstoqueInicial) {
    
    let novoProduto = { 
        IDDoestoque: IDestoque,
        nome: produto, 
        descricaoDoProduto: descricaoProduto,
        precoDoProduto: precoProduto,
        codigo: codig, 
        quantidade: qtidade,
        valorInicialDoEstoque: valorEstoqueInicial
    };
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
function validarProdutoParaRemocao(idIDestoque, idQtidadeProduto) {
    let IDestoque = document.getElementById(idIDestoque).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    if (IDestoque == "") {
        alert("O ID do estoque não pode estar em branco. Favor preenchê-lo!");
    } 
    
    else {
        removerProduto(IDestoque, parseInt(qtidade));
    }
}
function removerProduto(IDestoque, qtidade) {
    let posicao = 0;
    let verificar = 0;
    if (typeof (Storage) !== "undefined") {
        let estoque = JSON.parse(localStorage.getItem("estoque"));
        if (estoque == null) {
            alert("Não há itens cadastrados no estoque");
        } // Nenhum produto ainda foi cadastrado
        else {
            estoque.forEach((item) => {
                if (IDestoque == item.IDDoestoque && qtidade == item.quantidade) {
                    let confirmarAcao = window.confirm("Você está prestes a apagar TODOS os itens desse estoque. Deseja continuar?"); 
                    if (confirmarAcao) {
                        estoque.splice(posicao,1);
                        localStorage.setItem("estoque", JSON.stringify(estoque));
                        alert("Todas as unidades do produto " + item.nome + " foram removidas do estoque!");
                        atualizarRemocaoEstoque("totalEstoque");
                        location.reload();
    
                        if(posicao == 0) {
                            localStorage.removeItem("totalEstoque");
                            localStorage.removeItem("estoque");
                            carregarTotalEstoque("totalEstoque");
                        }
                    }

                    else {
                        location.reload();
                    }
                    verificar = 1;
                    
                }

                else if (IDestoque == item.IDDoestoque && qtidade < item.quantidade && qtidade > 0) {
                    item.quantidade -= qtidade;
                    localStorage.setItem("estoque", JSON.stringify(estoque));
                    alert(+ qtidade + " unidades do produto " + item.nome + " foram removidas do estoque!");
                    location.reload();
                    verificar = 1;
                }

                else if (IDestoque == item.IDDoestoque && qtidade > item.quantidade) {
                    alert("Você não tem produtos suficientes nesse estoque. Favor cadastrar mais produtos!");
                    location.reload();
                    verificar = 1;
                }

                else if (IDestoque == item.IDDoestoque && qtidade <= 0) {
                    alert("Digite uma quantidade maior que 0 por favor!");
                    location.reload();
                    verificar = 1;
                }

                posicao++;
            });
            if (verificar !=1) {
                alert('Não há itens cadastrados com os dados informados. Por favor, tente novamente.');
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
            posicao = -1;
            estoque = JSON.parse(estoque);
            let titulo = document.querySelector('#titulo');
            titulo.innerHTML = "Seu estoque:";
            estoque.forEach(produto => {
                let conteudoDaTabela = document.querySelector('#conteudoDaTabela');
                conteudoDaTabela.innerHTML += `
                <tr>
                <td><span></span></td>
                <td><span></span></td>
                <td><span></span></td>
                <td><span></span></td>
                <td><span></span></td>
                <td><span></span></td>
                <td><span></span></td>
                <td><span></span></td>
                <td><span></span></td>
                </tr>
                `;

                let colocarValores = document.querySelectorAll('#conteudoDaTabela span');
                posicao++;
                if (produto.quantidade >= 50){
                    colocarValores[posicao].innerHTML = '<i class="bi bi-caret-up-fill"></i>';
                }

                else if (produto.quantidade > 10 && produto.quantidade <50) {
                    colocarValores[posicao].innerHTML = '<i class="bi bi-caret-right-fill"></i>';
                }

                else if (produto.quantidade <= 10) {
                    colocarValores[posicao].innerHTML = '<i class="bi bi-caret-down-fill"></i>';
                }
                
                posicao++;
                colocarValores[posicao].innerHTML =  produto.IDDoestoque;
                posicao++;
                colocarValores[posicao].innerHTML =  produto.nome;
                posicao++;
                colocarValores[posicao].innerHTML =  produto.descricaoDoProduto;
                posicao++;
                colocarValores[posicao].innerHTML =  `R$ ${produto.precoDoProduto}`;
                posicao++;
                colocarValores[posicao].innerHTML =  produto.codigo;
                posicao++;
                colocarValores[posicao].innerHTML =  produto.quantidade;
                posicao++;
                colocarValores[posicao].innerHTML =  produto.valorInicialDoEstoque;

                let valorAtualDoEstoque = produto.precoDoProduto * produto.quantidade;

                posicao++;
                colocarValores[posicao].innerHTML =  valorAtualDoEstoque;
            });
        }
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
}
//-----------------------------------------------------------------------------------------------------------
// Excluí todos os itens do estoque (nome, código e quantidade) zerando a qtd e itens. Tudo precisa ser recadastrado.
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------

function apagarDadosEstoque() {
    let estoque = localStorage.getItem("estoque");
    console.log(estoque);
        if (estoque === null) {
            alert("Não há dados a serem excluídos verifique seu estoque.");
        }

        else {
            let confirmarAcao = window.confirm('Essa ação irá apagar TODOS os itens do estoque e não será possível recuperar. Deseja continuar?');
            
            if (confirmarAcao) {
                localStorage.removeItem("totalEstoque");
                localStorage.removeItem("estoque");
                carregarTotalEstoque("totalEstoque");
                location.reload();
            }
            else{
                location.reload();
            }
        }
}