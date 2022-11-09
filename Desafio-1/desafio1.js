class Usuario {

    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }

    getFullName() {
        
        return console.log(`Nombre completo del usurio: ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        
        return console.log(`Numero de mascotas ${this.mascotas.length}`);
    }

    addBook (title, autor) {
        this.libros.push({nombre: title, autor:autor})
    }

    getBookNames () {
        let nombres = this.libros.map(libro => libro.nombre)
        
        return console.table(nombres)
    }

}

const usuario = new Usuario ("Javier", "Maita")

usuario.addMascota("Lucy")

usuario.addBook("nombreDelLibro", "NombreDelAutor")

usuario.getFullName()
usuario.countMascotas()
usuario.getBookNames()