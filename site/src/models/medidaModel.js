var database = require("../database/config");

function buscarUltimasMedidas(token, limite_linhas) {

    instrucaoSql = ''
        instrucaoSql = `select 
        umi as umidade,
        temp as temperatura, 
                    dtHora,
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico
                    from leitura 
						join sensor on idSensor = fkSensor
                    where fkempresa = ${token}
                    order by idTempUmi desc limit ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidas(token, limite_linhas) {

    instrucaoSql = ''
        instrucaoSql = `select 
        umi as umidade,
        temp as temperatura, 
                    dtHora,
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico
                    from leitura 
						join sensor on idSensor = fkSensor
                    where fkempresa = ${token}
                    order by idTempUmi desc limit ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(token) {

    instrucaoSql = ''

        instrucaoSql = `select 
        umi as umidade,
        temp as temperatura, 
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico,
                        fkSensor
                    from leitura 
						join sensor on idSensor = fkSensor
                    where fkempresa = ${token}
                    order by idTempUmi desc limit 1;`
                    

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarQtdCaminhao(token) {

    instrucaoSql = ''
        instrucaoSql = `
        select count(idCaminhao) as qtdCaminhao from caminhao 
            where fkEmpresa = ${token};
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}
function buscarTipoCaminhao(token) {

    instrucaoSql = ''
        instrucaoSql = `
        select count(idCaminhao) as tipoCaminhao from caminhao 
            where fkEmpresa = ${token} group by tipo order by tipo;;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscarStatSensor(token) {

    instrucaoSql = ''
        instrucaoSql = `
        select count(idSensor) as tipoSensor from sensor 
            where fkEmpresa = ${token} group by statusSensor order by statusSensor;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscarStatSensorCam(token, idCaminhao) {

    instrucaoSql = ''
        instrucaoSql = `
        select count(idSensor) as tipoSensor from sensor 
            where fkEmpresa = ${token} and fkCaminhao = ${idCaminhao} group by statusSensor order by statusSensor;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


module.exports = {
    buscarUltimasMedidas,
    buscarQtdCaminhao,
    buscarTipoCaminhao,
    buscarStatSensor,
    buscarStatSensorCam,
    buscarMedidasEmTempoReal
}
