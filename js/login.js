onload = () => { //evento load, retorna uma função anônima de todo o código, o código só será executado ao final do carregamento do documento html
    let olho = document.querySelector('#olho'); //2 variáveis para seleção dos icones de olho
    let olhoCortado = document.querySelector('#olhoCortado');

    let validEmail = false; //variáveis para validação dos campos de formulário 
    let validSenha = false;
    function validarCadastro() { //função para válidação do cadastro, torna o botão "inclicável" enquanto as condições de válidação não forem satifeitas
        if (validEmail && validSenha) { //se validEmail e validSenha forem iguais a true, esse bloco será executado
            botao.disabled = false; //botão disponível para clique caso as variaveis de validação sejam verdadeiras 

            botao.onclick = () => { //esse bloco de códigos será executado após o botão de login ser clicado, id do botão de login == 'botao'
                let listaUser = []; //criação de um vetor, para atribuição dos objetos armazenados no localStorage

                let validUser = { //objetos vazios sendo atribuidos ao vetor de objetos validUser
                    nome: '', //cada objeto receberá um valor, conforme os valores do formulário de cadastro
                    sobrenome: '',
                    email: '',
                    senha: ''
                };

                //pegando o item listaUser do localStorage, tranformando-o de string para objeto novamente com o JSON.parse e o atribuindo ao vetor listaUser criado mais acima
                listaUser = JSON.parse(localStorage.getItem('listaUser'));

                listaUser.forEach((item) => { //forEach utilizado para percorrer os itens de listaUser
                    if (email.value == item.emailCad && senha.value == item.senhaCad) { //esse bloco de códigos só será executado se os valores digitados no campo de formulário forem iguais aos itens armazenados no localStorage
                        validUser = { //os objetos de validUser, anteriormente vazios, recebem os valores dos itens armazenados no localStorage
                            nome: item.nomeCad,
                            sobrenome: item.sobrenomeCad,
                            email: item.emailCad,
                            senha: item.senhaCad
                        }
                    }
                });

                //esse bloco será executado apenas se os valores em validUser forem iguais aos valores digitados no campo de formulário, ou seja, se o usuário tiver sido cadastrado anteriormente, se existir no localStorage aqueles respectivos e-mail e senha digitados 
                if (email.value == validUser.email && senha.value == validUser.senha) {
                    msg.style.display = "none";//mensagem de erro sendo ocultada com display = 'none'
                    msg.innerHTML = '';

                    window.location.href = '../pages/softwareTelaPrincipal.html'; //após a autenticação, o usuário será mandado para a página de início

                    let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
                    //token de validação, gerado de forma aleatória pelo método random(), hexadecimal, ignorando os dois primeiros caracteres, depois concatenado com ele mesmo para dobrar o tamanho.
                    //o token será utilizadao na página de início para impedir a permanencia sem o login
                    localStorage.setItem('token', token); //criação da chave 'token' para armazenamento do conteudo da variável token criada acima

                    let user = JSON.parse(localStorage.getItem('[]'));
                    user = {
                        email: email.value,
                        senha: senha.value
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                }
                //se os valores digitados no campo de formulário forem diferentes dos valores dos itens de validUser, ou seja, se não existir no localStorage, esse bloco será executado
                else {
                    msg.style.display = "block";//a mensagem de erro receberá um display = 'block' assim, ela aparecerá para o esuário
                    //com o innerHTML, o elemento html da mensagem receberá o seguinte texto
                    msg.innerHTML = 'E-mail ou senha incorretos,<br>se não tiver uma conta, você pode criar uma na página de cadastro';
                    email.focus();//logo após o erro, o ponteiro do mouse aparecerá no formulário de e-mail
                }
            }
        }
        else { //o botão se torna "inclicável" enquanto as condições de válidação não forem satisfeitas
            botao.disabled = true;
            login.onsubmit = (evento) => { //evento submit, no formulário(tag html) login, recebendo função com um evento que previne o funcionamento normal do botão submit
                evento.preventDefault();
            }

        }
    }
    validarCadastro(); // executar a função antes de tudo, previne o envio do furmulário caso os campos estejam em branco, o botão já vem "inclicável"

    email.onfocus = () => { //ações quando o formlário receber o foco
        labelEmail.innerHTML = 'Digite o seu e-mail:';
    }

    //condições de validação do formulário de e-mail
    email.onkeyup = () => { //ações quando o usuário tirar o dedo da tecla
        if (email.value.length == 0) { //se o comprimento do vetor do fomuláro ser igual a 0
            labelEmail.innerHTML += '*'
            labelEmail.style.color = 'red';
            email.style.border = 'thin red solid';
            validEmail = false;
            validarCadastro();
        }
        else { //se não for igual a 0
            labelEmail.innerHTML = 'E-mail:';
            labelEmail.style.color = 'black';
            email.style.border = 'thin #CED4DA solid';
            validEmail = true;
            validarCadastro();
        }
    }

    olho.onclick = () => { //evento de click no icone de olho para mudar o atributo do formulário senha para texto
        senha.setAttribute('type', 'text'); // torna a senha visivel para o usuário
        olho.style.display = "none"; // esconde o icone
        olhoCortado.style.display = "inline"; // faz aparecer um icone que antes estava co o display none
    }

    olhoCortado.onclick = () => { // bloco para trabalhar o icone de olho cortado, possuí efeito contrário ao do bloco acima
        senha.setAttribute('type', 'password');
        olhoCortado.style.display = "none";
        olho.style.display = "inline";
    }

    senha.onfocus = () => {
        labelSenha.innerHTML = 'Digite a sua senha:';
    }

    //condições de validação do formulário de senha
    senha.onkeyup = () => {
        if (senha.value.length < 8) { //se o comprimento do vetor do formulário ser menor que 8
            labelSenha.innerHTML = 'A senha deve conter no minímo 8 caracteres*'
            labelSenha.style.color = 'red';
            senha.style.border = 'thin red solid';
            validSenha = false;
            validarCadastro();
        }
        else { //se não for menor que 8
            labelSenha.innerHTML = 'Senha:';
            labelSenha.style.color = 'black';
            senha.style.border = 'thin #CED4DA solid';
            validSenha = true;
            validarCadastro();
        }
    }
}