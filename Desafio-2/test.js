const Contenedor = require('./index.js')

                                                                                                                                               
const item1 = {                                                                                                                                                    
                title: 'Escuadra',                                                                                                                                 
                price: 123.45,                                                                                                                                     
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
                id: 1                                                                                                                                              
            }
                                                                                                   
const item2 = {                                                                                                                                                    
                title: 'Calculadora',                                                                                                                              
                price: 234.56,                                                                                                                                     
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
                id: 2                                                                                                                                              
            }
                                                                                                                        
const item3 = {                                                                                                                                                    
                title: 'Globo Terráqueo',                                                                                                                          
                price: 345.67,                                                                                                                                     
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
                id: 3                                                                                                                                              
            }

const item4 = {                                                                                                                                                    
                title: 'Escuadra',                                                                                                                                 
                price: 123.45,                                                                                                                                     
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
                id: 1                                                                                                                                              
            }

async function main() {
    const contenedor = new Contenedor('./productos.txt')
    
    let datos = await contenedor.getAll()
    console.log(datos)

    //un elemento

    let id1 = await contenedor.save(item1)
    console.log(id1);

    //dos elementos
    let id2 = await contenedor.save(item2)
    console.log(id2);

    //busca id1
    let busca1 = await contenedor.getById(1)
    console.log(busca1);

    //busca id2  NO EXISTE

    let busca2 = await contenedor.getById(10)
    console.log(busca2);

    //debe salir un mensaje de error
    let id3 = await contenedor.save(item4)

    //BORRAR el id1, deberia tener 1 elemento
    await contenedor.deleteById(1)
    
    let delete1 = await contenedor.getAll()
    console.log(delete1);

    //BORRAR TODO
    await contenedor.deleteAll()
    
    let delete2 = await contenedor.getAll()
    console.log(delete2);
}

main()