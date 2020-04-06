#  Mercadão

Tem como proposta integrar pequenos negócios de bairro, autônomos e profissionais informais com sua clientela local para que possam gerar um fluxo de caixa com o intuito de sustentar o negócio enquanto durar o isolamento social gerado pela pandemia.
Temos como intuito facilitar doações, vendas de vouchers e produtos via internet.

#  Iniciando o Projeto

Ao clonar o repositório voce terá 3 pastas distintas referente ao Back-End, Front-End e Mobile, vamos iniciar pelo mais dificil, o Back-End !

## Pré-Requisitos

Para começar, temos que ter alguns programas instalados em nosso computador.

* Node 
* Yarn
* Docker
* PostBird
* Expo (instalado no celular)

Após a instalação desses programas, acesse o site https://developer.here.com/ e faça um cadastro. 

## Back-End

Vamos considerar que voce instalou o Docker, para instalar os containers com os seus devidos bancos, abra o Windows Power Shell como administrador e execute:

```shell
$ docker run --name mercadaoPost -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres
$ docker run --name mercadaoMong -p 27017:27017 -d -t mongo
$ docker ps
```

Se estiver com problemas, verifique o erro que lhe aparece, procure soluções no google, o pai de todos !, lá há muitas pessoas que possam ter a mesma duvida que voce !
Entre na pasta BackEnd, altere o nome do arquivo '.env.example' para '.env' e preencha da seguinte maneira:

> APP_URL=http://localhost:3333
> NODE_ENV = development
> APP_SECRET_USER=Variavel_Aleatoria
> APP_SECRET_ENTREPRENEURIAL=Variavel_Aleatoria

> DB_HOST=127.0.0.1
> DB_USER=postgres
> DB_PASS=123456
> DB_NAME=mercadao

> HERE_TOKEN=Seu_Token

> MONGO_URL=mongodb://localhost:27017/mercadao

Abra o postbird, conecte usando as variaveis indicadas acima, e crie um Banco com o nome de mercadao. Pronto, agora basta executar um comando e deixar ele executando:

```shell
$ yarn dev
```
## FrontEnd
Agora que nosso servidor esta executando, vamos abrir outro terminal na pasta frontend e executar o seguinte comando:

```shell
$ yarn start
```

## Mobile

Por ultimo, entramos na pagina mobile executamos o mesmo código anterior:

```shell
$ yarn start
```

Vai abrir uma aba no seu navegador com um QrCode no canto inferior esquerdo, abra o aplicavivo Expo em seu celular para ler o QrCode, assim que ler, vai carregar todo o aplicativo em seu celular, basta apenas Usar o aplicativo :)
