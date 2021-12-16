onload = () => { //evento load, retorna uma função anônima de todo o código, o código só será executado ao final do carregamento do documento html
    let olhoSenha = document.querySelector('#olhoSenha'); //4 variáveis para seleção dos icones de olho
    let olhoCortadoSenha = document.querySelector('#olhoCortadoSenha');
    let olhoConfirmarSenha = document.querySelector('#olhoConfirmarSenha');
    let olhoCortadoConfirmarSenha = document.querySelector('#olhoCortadoConfirmarSenha');

    let validNome = false;
    let validSobrenome = false;
    let validEmail = false; //variáveis para validação dos campos de formulário 
    let validSenha = false;
    let validConfirmarSenha = false;

    function validarCadastro() { //função para válidação do cadastro, torna o botão "inclicável" enquanto as condições de válidação não forem satifeitas
        if (validEmail && validSenha && validConfirmarSenha && validNome && validSobrenome){ //se validEmail, validSenha, validConfirmarSenha, validNome e validSobrenome forem iguais a true, esse bloco será executado
            botao.disabled = false; //botão disponível para clique caso as variaveis de validação sejam verdadeiras 
            
            botao.onclick = () => { //esse bloco de códigos será executado após o botão de login ser clicado, id do botão de login == 'botao'
                msg.style.display = "block"; //a mensagem de erro receberá um display = 'block' assim, ela aparecerá para o esuário
                //com o innerHTML, o elemento html da mensagem receberá o seguinte texto
                msg.innerHTML = 'Cadastrando usuário...';

                //Criação da variável listaUser, está sendo atribuída a ela um vetor vazio, caso seja o primeiro cadastro, ou o item listaUser do localStorage, caso não seja o primeiro cadastro, o item com essa chave já existirá no localStorage, ele está sendo pego pelo método getItem. Depois, com o método parse do objeto JSON ele é tranformado de uma string para objeto novamente 
                let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

                //O método push atribuirá ao final do vetor listaUser os novos dados de usuário digitados nos campos de formulário 
                listaUser.push(
                {
                    nomeCad: nome.value,
                    sobrenomeCad: sobrenome.value,
                    emailCad: email.value,
                    senhaCad: senha.value 
                }
                )

                // o vetor listaUser com o método stringify (que tranforma o objeto em string) do objeto JSON é atribuido ao final do vetor de objetos listaUser no localStorage com o método setItem
                localStorage.setItem('listaUser', JSON.stringify(listaUser));

                setTimeout(() => {
                window.location.href = '../pages/login.html'
                }, 3000);
            }
        }
        else{ //o botão se torna "inclicável" enquanto as condições de válidação não forem satisfeitas
            botao.disabled = true;
            cadastro.onsubmit = (evento) => { //evento submit, no formulário(tag html) cadastro, recebendo função com um evento que previne o funcionamento normal do botão submit
                evento.preventDefault();
            }
        } 
    }
    validarCadastro(); // executar a função antes de tudo, previne o envio do furmulário caso os campos estejam em branco, o botão já vem "inclicável"
    
    //condições de validação do formulário de nome
    nome.onkeyup = () => { //ações quando o usuário tirar o dedo da tecla
        if (nome.value.length <= 2){
            labelNome.style.color = "red";
            nome.style.border = "thin red solid"; 
            validNome = false;
            validarCadastro();
        }
        else {
            labelNome.style.color = "black";
            nome.style.border = "#CED4DA"; 
            validNome = true;
            validarCadastro();
        }
    }

    //condições de validação do formulário de sobrenome
    sobrenome.onkeyup = () => {
        if (sobrenome.value.length <= 2){
            labelSobrenome.style.color = "red";
            sobrenome.style.border = "thin red solid"; 
            validSobrenome = false;
            validarCadastro();
        }
        else {
            labelSobrenome.style.color = "black";
            sobrenome.style.border = "#CED4DA"; 
            validSobrenome = true;
            validarCadastro();
        }
    }

    //condições de validação do formulário de e-mail
    email.onkeyup = () => { 
        if (email.value.endsWith('@gmail.com') || email.value.endsWith('@gmail.com.br')){ 
            labelEmail.innerHTML = 'Digite seu e-mail:';             
            labelEmail.style.color = 'black';
            email.style.border = 'thin #CED4DA solid';
            validEmail = true;
            validarCadastro();
        } 
        else if(email.value.includes(' ') || email.value.includes('..') || email.value.includes('||\\!%*$-=§°/?\'",;;<>]}ºª¬¨£¢¹²³()#')){ 
            labelEmail.innerHTML = 'E-mail inválido*'; 
            labelEmail.style.color = 'red';
            email.style.border = 'thin red solid'; 
            validEmail = false;
            validarCadastro();
        } 
        else { //se não for igual a 0
            labelEmail.innerHTML = 'E-mail inválido*'; 
            labelEmail.style.color = 'red';
            email.style.border = 'thin red solid'; 
            validEmail = false;
            validarCadastro();
        }
    }

    olhoSenha.onclick = () => { //evento de click no icone de olho para mudar o atributo do formulário senha para texto
        senha.setAttribute('type', 'text'); // torna a senha visivel para o usuário
        olhoSenha.style.display = "none"; // esconde o icone
        olhoCortadoSenha.style.display = "inline"; // faz aparecer um icone que antes estava co o display none
    }

    olhoCortadoSenha.onclick = () => { // bloco para trabalhar o icone de olho cortado, possuí efeito contrário ao do bloco acima
        senha.setAttribute('type', 'password');
        olhoCortadoSenha.style.display = "none";
        olhoSenha.style.display = "inline";
    }
    
    //condições de validação do formulário de senha
    senha.onkeyup = () => {
        if (senha.value.length < 8){ //se o comprimento do vetor do formulário for menor que 8
            labelSenha.innerHTML = 'A senha deve ter no minímo 8 caracteres*'
            labelSenha.style.color = 'red';
            senha.style.border = 'thin red solid';
            validSenha = false;
            validarCadastro();
        } 
        else if (senha.value != confirmarSenha.value){ //verificar se as senhas são diferentes, se o usuário alterar o formulario de senha depois do de corfirmar senha
            labelSenha.innerHTML = 'As senha devem ser iguais*'
            senha.style.border = 'thin red solid';
            validSenha = false;
            validarCadastro();
        }
        else { //se não for menor que 8
            labelSenha.innerHTML = 'Digite sua senha:'; 
            labelSenha.style.color = 'black';
            senha.style.border = 'thin #CED4DA solid';
            validSenha = true;
            validarCadastro();
        }
    }

    olhoConfirmarSenha.onclick = () => { // mesmo efeito dos outro blocos de código mais acima
        confirmarSenha.setAttribute('type', 'text'); // torna a senha visivel ao usuário, dessa vez no formulário confirmar senha
        olhoConfirmarSenha.style.display = "none";
        olhoCortadoConfirmarSenha.style.display = "inline";
    }

    olhoCortadoConfirmarSenha.onclick = () => { // efeito contrário ao do bloco acima
        confirmarSenha.setAttribute('type', 'password');
        olhoCortadoConfirmarSenha.style.display = "none";
        olhoConfirmarSenha.style.display = "inline";
    }

    //condições de validação do formulário de corfirmar senha
    confirmarSenha.onkeyup = () => {
        if (confirmarSenha.value != senha.value){ //se o valor do vetor confirmar senha for diferente do vetor senha
            labelConfirmarSenha.innerHTML = 'As senhas devem ser iguais*'
            labelConfirmarSenha.style.color = 'red';
            confirmarSenha.style.border = 'thin red solid';
            validConfirmarSenha = false;
            validarCadastro();
        } 
        else { //se o valor do vetor confirmar senha for igual a do vetor senha
            labelConfirmarSenha.innerHTML = 'Confirme sua senha:'; 
            labelConfirmarSenha.style.color = 'black';
            confirmarSenha.style.border = 'thin #CED4DA solid';
            
            labelSenha.innerHTML = 'Digite sua senha:'; 
            labelSenha.style.color = 'black';
            senha.style.border = 'thin #CED4DA solid';

            validSenha = true;
            validConfirmarSenha = true;
            validarCadastro();
        }
    }
}