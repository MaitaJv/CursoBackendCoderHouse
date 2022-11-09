const express  =  require('express')
const Contenedor = require('./contenedor.js')

const app = express()

const PORT = 8080

async function main(){
    const contenedor = new Contenedor('./productos.txt')

    let datos = await contenedor.getAll()
    console.log(datos)

    let productoAleatorio = Math.floor(Math.random() * datos.length)
    console.log(productoAleatorio);

    const servidor = app.listen(PORT, ()=>{
        console.log(`Servidor prendido escuchando ${PORT}`);
    })
    
    app.get('/', (req, res)=>{
        res.send(`<h1>Desafio-3</h1>`)
    })

    app.get('/productos', (req, res)=>{
        res.send(datos)
    })

    app.get('/productoRandom', (req, res)=>{
        res.send(datos[productoAleatorio])
    })
    
    servidor.on('error', (err)=>{
        console.log(`ERROR ${err}`);
    })
}

main()