<?php
    //incluindo a conexao com o banco de dados
    include_once('estoque');
    //recuperando o valor da palavra
    $produtos = $_POST['palavra'];
    //pesuisar no banco de dados o nome do produto pelo campo nome;
    $produtos = "SELECT * FROM  listarEstoque WERE nome LIKE '$%produtos%'";
    $resultado_buscas = mysqli_query($conn, $produtos);
    if(mysqli_num_rows($resultado_buscas) <= 0){
        echo "Nenhum item encontrado";
    } else {
        while(rows = mysqli_fetch_assoc($resultado_buscas)){
            echo "<li>".$rows['nome']."</li>"
        }     
    }
?>