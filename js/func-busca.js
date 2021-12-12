$(function(){
	//Pesquisar os cursos sem refresh na página
	$("#pesquisa").keyup(function(){
		var pesquisa = $(this).val();
		//Verificar se há algo digitado
		if(pesquisa != ''){
			var dados = {
				palavra : pesquisa
			}		
			$.post('busca.php', dados, function(retorna){
				//Mostra dentro da ul os resultado obtidos 
				$(".resultado").html(retorna);
			});
		}else{
			//se nenhum resultado for encontrado não serão exibidos dados
			$(".resultado").html('');
		}		
	});
});


function busca(idNome){
	let nome = document.getElementById(idNome).value;
	let estoque = JSON.parse(localStorage.getItem("estoque"));
	let verificar = false;
	if (estoque !== null) {
        estoque.forEach((item) => {
            if (nome == item.idNome) {
                listarEstoque(item);
                verificar = true;
            }
        });
    }else if (verificar == false) {
		alert("Nenhum item com este nome foi encontrado, tente novamente usando outro nome.");
    }

}