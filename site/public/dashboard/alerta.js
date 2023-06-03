token = sessionStorage.TOKEN_USUARIO;
var alertas = [];

  
function obterdados2(token){
fetch(`/medidas/ultimas/${token}`)
.then(resposta => {
    if (resposta.ok) {
        resposta.json().then(resposta =>{
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            alertar(resposta, token);
        }); 
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function alertar(resposta, token) {
    var temp = resposta[0].temperatura;

    console.log(token === resposta[0].fkSensor)
    
    var grauDeAviso ='';

    var limites = {
        muito_quente: 1,
        quente: 0.6,
        ideal: -1.05,
        frio: -16,
        muito_frio: -18.7
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, token, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, token, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(token);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, token, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, token, grauDeAviso, grauDeAvisoCor)
    }

    // var card;

    card_temp.innerHTML = temp + "°C";
    
    // card = document.getElementById("");
    // card.className = classe_temperatura;

    // if (token == 1) {
    //     temp_aquario_1.innerHTML = temp + "°C";
    //     card = card_1
    // } else if (token == 2) {
    //     temp_aquario_2.innerHTML = temp + "°C";
    //     card = card_2
    // } else if (token == 3) {
    //     temp_aquario_3.innerHTML = temp + "°C";
    //     card = card_3
    // } else if (token == 4) {
    //     temp_aquario_4.innerHTML = temp + "°C";
    //     card = card_4
    // }


}

function exibirAlerta(temp, token, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.token == token);

    if (indice >= 0) {
        alertas[indice] = { token, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ token, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(token) {
    alertas = alertas.filter(item => item.token != token);
    exibirCards();
}
 
function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ token, temp, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Caminhão ${token} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${temp}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
  
  function atualizacaoPeriodica() {
    obterdados2(2000)
    
    obterdados3(2000)// obterdados2(2001)
    setTimeout(atualizacaoPeriodica, 5000);
    }



    var alertas2 = [];

  
function obterdados3(token){
fetch(`/medidas/ultimas/${token}`)
.then(resposta => {
    if (resposta.ok) {
        resposta.json().then(resposta =>{
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            alertar2(resposta, token);
        }); 
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function alertar2(resposta, token) {
    var umi = resposta[0].umidade;

    console.log(token === resposta[0].fkSensor)
    
    var grauDeAviso ='';

    var limites = {
        muito_quente: 90,
        quente:87,
        ideal: 80,
        frio: 76,
        muito_frio: 75
    };

    var classe_umidade = 'cor-alerta';

    if (umi >= limites.muito_quente) {
        classe_umidade = 'cor-alerta perigo-umido';
        grauDeAviso = 'perigo-umido'
        grauDeAvisoCor = 'cor-alerta perigo-umido'
        exibirAlerta2(umi, token, grauDeAviso, grauDeAvisoCor)
    }
    else if (umi < limites.muito_quente && umi >= limites.quente) {
        classe_umidade = 'cor-alerta alerta-umido';
        grauDeAviso = 'alerta-umido'
        grauDeAvisoCor = 'cor-alerta alerta-umido'
        exibirAlerta2(umi, token, grauDeAviso, grauDeAvisoCor)
    }
    else if (umi < limites.quente && umi > limites.frio) {
        classe_umidade = 'cor-alerta ideal2';
        removerAlerta2(token);
    }
    else if (umi <= limites.frio && umi > limites.muito_frio) {
        classe_umidade = 'cor-alerta alerta-seco';
        grauDeAviso = 'alerta-seco'
        grauDeAvisoCor = 'cor-alerta alerta-seco'
        exibirAlerta2(umi, token, grauDeAviso, grauDeAvisoCor)
    }
    else if (umi <= limites.muito_frio) {
        classe_umidade = 'cor-alerta perigo-seco';
        grauDeAviso = 'perigo-seco'
        grauDeAvisoCor = 'cor-alerta perigo-seco'
        exibirAlerta2(umi, token, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    card_umi.innerHTML = umi + "%";
    // card = document.getElementById("");
    // card.className = classe_umidade;

    // if (token == 1) {
    //     temp_aquario_1.innerHTML = temp + "°C";
    //     card = card_1
    // } else if (token == 2) {
    //     temp_aquario_2.innerHTML = temp + "°C";
    //     card = card_2
    // } else if (token == 3) {
    //     temp_aquario_3.innerHTML = temp + "°C";
    //     card = card_3
    // } else if (token == 4) {
    //     temp_aquario_4.innerHTML = temp + "°C";
    //     card = card_4
    // }


}

function exibirAlerta2(umi, token, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas2.findIndex(item => item.token == token);

    if (indice >= 0) {
        alertas2[indice] = { token, umi, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas2.push({ token, umi, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards2();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta2(token) {
    alertas2 = alertas2.filter(item => item.token != token);
    exibirCards2();
}
 
function exibirCards2() {
    alerta2.innerHTML = '';

    for (var i = 0; i < alertas2.length; i++) {
        var mensagem = alertas2[i];
        alerta2.innerHTML += transformarEmDiv2(mensagem);
    }
}

function transformarEmDiv2({ token, umi, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Caminhão ${token} está em estado de ${grauDeAviso}!</h3>
    <small>Umidade ${umi}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}