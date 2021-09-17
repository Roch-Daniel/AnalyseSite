# Analyse de Site

## Sobre:
Pequena pagina de analise, com seu front em React', onde você consegue enviar um link de qualquer site https, e um "robô", atravês do Node.JS, irá analisar quantos links internos e externos, qual o domínio do site e e se ele é ou não html5.

## 1º passo:
Vá na pasta consulta_url (cd consulta_url) e dê o seguinte comando:
`npm install` - assim ele instalará tudo de react e styled-components
Esta é a parte do React: localhost:3000

## 2º passo:
voltando pasa a pasta principal (cd..), dê o mesmo comando:
`npm install` - para que assim ele instale as seguintes bibliotecas(puppeteer,express,nodemon,concurrently)
Está é a parte do Node: localhost:5000

# Explicação das Bibliotecas:
- [Puppeteer](https://www.npmjs.com/package/puppeteer) - Bot que irá me auxiliar para fazer as analises do site.

- [Express](https://www.npmjs.com/package/express) para me auxiliar na rota, para pegar as informações. 

- [Nodemon](https://www.npmjs.com/package/nodemon) para me auxiliar na parte de desenvolvimento. (com isso consigo somente rodar a parte Back usando o seguinte comando: npm run devNode)

- [Concurrently](https://www.npmjs.com/package/concurrently) auxilio para quando eu dar o seguinte comando: `npm run dev` ele irá abrir tanto o node quanto o react! 
