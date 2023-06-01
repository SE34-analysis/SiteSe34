-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/
create database SE34_analysis;
use SE34_analysis;
drop database SE34_analysis;

-- TABELA EMPRESA
CREATE TABLE empresa (
	idEmpresa int primary key auto_increment,
	nomeEmpresa varchar(70),
	CNPJ char(18) NOT NULL,
	emailEmpresa varchar(70) NOT NULL
)auto_increment = 2000 ;

SELECT * FROM empresa;

insert into empresa values
(null, 'Se34', '123456789876543212', 'se34@gmail.com')
;

-- TABELA USUARIO
CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY auto_increment,
    nome varchar(70) NOT NULL,
	email varchar(70) NOT NULL,
    senha varchar(8) NOT NULL,
    cpf varchar(14) NOT NULL,
	token int,
   constraint fkEmp foreign key (token) references empresa (idEmpresa)
) auto_increment = 2000;

insert into usuario values
(null, 'Nathan', 'nathan@sptech.com', '123456@', '123.321.123-00', 2000);
-- coloquei o 0 no final sem querer

select * from usuario; 


alter table Usuario modify column cpf char(14);
select * from usuario;
-- DESCRIÇÃO DA TABELA USUARIO
DESC usuario;

-- CONSULTA O LOGIN / EMAIL E SENHA
SELECT email, senha FROM usuario;


-- TABELA DO CAMINHÃO
create table caminhao (
idCaminhao int auto_increment,
tipo varchar(10) NOT NULL, constraint tipoC check(tipo in('Gelo', 'Nitrogenio')),
fkEmpresa INT,
primary key(idCaminhao, fkEmpresa),
constraint fkEmpresa2 foreign key (fkEmpresa) references empresa (idEmpresa)
) auto_increment = 50;

-- INSERINDO OS DADOS NO CAMINHÂO
insert into caminhao values 
(null , 'Gelo', 2000),
(null , 'Gelo', 2000),
(null , 'Nitrogenio', 2000),
(null , 'Gelo', 2000),
(null , 'Gelo', 2000);

-- SELECTS DA TABLEA CAMINHÃO
SELECT * FROM  caminhao;

-- TABELA SENSOR
CREATE TABLE sensor (
	idSensor INT PRIMARY KEY auto_increment,
	statusSensor varchar(10),
	fkcaminhao INT,
    fkEmpresa int, 
    constraint fkEmpresa foreign key (fkEmpresa) references empresa(idEmpresa),
	constraint fkCaminhao foreign key (fkCaminhao) references caminhao (idCaminhao),
	constraint ckcStatusSensor CHECK 
	(statusSensor in ('Ativo', 'Inativo', 'Manutenção'))
);
truncate table sensor;

insert into sensor values
(null, 'Ativo', 50, 2000),
(null, 'Ativo', 50, 2000),
(null, 'Ativo', 50, 2000),
(null, 'Ativo', 50, 2000),
(null, 'Ativo', 51, 2000);

insert into sensor values
(null, 'Inativo', 50, 2000),
(null, 'Inativo', 50, 2000),
(null, 'Inativo', 50, 2000),
(null, 'Manutenção', 51, 2000);

-- SELECTS DA TABELA SENSOR
SELECT * FROM sensor;

-- TABELA TEMPERATURA E UMIDADE
CREATE TABLE Leitura (
	idTempUmi INT primary key auto_increment,
	umi double,
	temp double,
	dtHora datetime default current_timestamp,
    fkSensor int,
    constraint fksensor foreign key (fkSensor) references sensor(idSensor)
    );
truncate table Leitura; -- limpa as leituras


insert into leitura(idTempUmi, umi, temp, fkSensor) values
(null, '60', '-1.00', 1),
(null, '70', '-1.50', 1),
(null, '20', '-1.10', 1),
(null, '30', '-1.20', 1),
(null, '50', '-1.30', 1),
(null, '60', '-1.40', 1),
(null, '90', '-1.50', 1)
;

-- VALORES DO LM35 E DHT11
select temp as temperatura, 
        umi as umidade,  
                      dtHora,
                        FORMAT(dtHora, 'HH:mm:ss') as momento_graficofrom   from  leitura 
                    where fk_Empresa = ${token}
                    order by idTempUmi desc; 
                    
-- SELECTS DA TABELA TEMPERATURA
SELECT * FROM leitura;
SELECT * FROM leitura JOIN sensor ON fkSensor = idSensor;
SELECT * FROM leitura JOIN sensor ON fkSensor = idSensor JOIN caminhao ON fkCaminhao = idCaminhao JOIN empresa ON fkEmpresa = idEmpresa;
                     
select count(idCaminhao) as tipoCaminhao from caminhao 
            where fkEmpresa = 2000 group by tipo order by tipo;
            
select count(idSensor) as tipoSensor from sensor 
            where fkEmpresa = 2000 group by statusSensor order by statusSensor;

select count(idCaminhao) as qtdCaminhao from caminhao 
            where fkEmpresa = 2000;
            
select count(idSensor) as tipoSensor from sensor 
            where fkEmpresa = 2000 and fkCaminhao = 50 group by statusSensor order by statusSensor;
            
            
select 
        umi as umidade,
        temp as temperatura, 
                    dtHora,
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico
                    from leitura 
						join sensor on idSensor = fkSensor
                    where fkempresa = 2000
                    order by idTempUmi desc limit 7;
select 
        umi as umidade,
        temp as temperatura, 
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico,
                        fkSensor
                    from leitura 
						join sensor on idSensor = fkSensor
                    where fkempresa = 2000
                    order by idTempUmi desc limit 1;