const fs = require('fs')

class Contenedor{

    constructor(ruta){
        this.ruta = ruta
    }

    async save(objeto){
        const listado = await this.getAll()

        let nuevoId

        if(listado.length > 0 && listado.some((el) => el.title === objeto.title)){
            console.log('El producto ya existe')
            return
        }

        if(listado.length == 0){
            nuevoId = 1
        }else{
            nuevoId = listado[listado.length - 1].id +1
        }

        const nuevoObjeto = {...objeto, id: nuevoId}

        listado.push(nuevoObjeto)

        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null , 2))
            return nuevoId
        }catch(error){
            throw new Error(`Error al guarda un nuevo objeto: ${error}`)
        }
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.ruta, 'utf8')
            return JSON.parse(data)
        }catch(error){
            return []
        }
    }

    async getById(id){
        try {
            const listado = await this.getAll()
            return listado.find(item => item.id === id) ?? null
        } catch (error) {
            throw new Error(`No se encontro el dato: ${error}`)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null , 2))
        }catch(error){
            throw new Error(`No se pudieron eliminar los datos: ${error}`)
        }
    }

    async deleteById(id){
        const listado = await this.getAll()

        const nuevoListado = listado.filter( item => item.id != id )

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoListado, null, 2))
        } catch (error) {
            throw new Error(`No se pudo borrar el dato: ${error}`)
        }
    }
}

module.exports = Contenedor