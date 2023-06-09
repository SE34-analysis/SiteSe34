// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        b_usuario.innerHTML = nome;

        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../Cadastro.html?#";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

function caminhãoA1() {
    sessionStorage.setItem('IDCAMINHAO', 50);
    window.location = 'caminhao.html'
}
function caminhãoA2() {
    sessionStorage.setItem('IDCAMINHAO', 51)
    window.location = 'caminhao.html'
}
function caminhãoA3() {
    sessionStorage.setItem('IDCAMINHAO', 52)
    window.location = 'caminhao.html'
}
function caminhãoA4() {
    sessionStorage.setItem('IDCAMINHAO', 53)
    window.location = 'caminhao.html'
}


var exibir_menu = false

function mostrarmenu() {
    if (exibir_menu == true) {
        exibir_menu = false
        child_dropdown.style.display = 'none'
    } else {
        exibir_menu = true
        child_dropdown.style.display = 'block'
    }
}
var exibir_caminhao = false

function mostrartrucks() {
    if (exibir_caminhao == true) {
        exibir_caminhao = false
        caminhaoes.style.display = 'none'
    } else {
        exibir_caminhao = true
        caminhaoes.style.display = 'block'
    }
}
