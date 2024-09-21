const db = require('../config/db.config.js');
const Libros = db.Libros;

// Crear un nuevo libro
exports.create = (req, res) => {
    let libro = {};

    try {
        libro.Titulo = req.body.Titulo;
        libro.Id_autor = req.body.Id_autor;
        libro.Isbn = req.body.Isbn;
        libro.Editorial = req.body.Editorial;
        libro.Año_publicacion = req.body.Año_publicacion;
        libro.Categoría = req.body.Categoría;
        libro.Cantidad_disponible = req.body.Cantidad_disponible;
        libro.Ubicacion = req.body.Ubicacion;

        Libros.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con ID = " + result.Id_libro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Recuperar todos los libros
exports.retrieveAllLibros = (req, res) => {
    Libros.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "Obtención de todos los libros exitosa!",
                libros: libroInfos
            });
        })
        .catch(error => {
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

// Obtener un libro por su ID
exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libros.findByPk(libroId)
        .then(libro => {
            if (libro) {
                res.status(200).json({
                    message: "Libro obtenido con éxito con ID = " + libroId,
                    libro: libro
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el libro con ID = " + libroId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

// Actualizar un libro por su ID
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro con ID = " + libroId,
                error: "404"
            });
        } else {
            let updatedObject = {
                Titulo: req.body.Titulo,
                Id_autor: req.body.Id_autor,
                Isbn: req.body.Isbn,
                Editorial: req.body.Editorial,
                Año_publicacion: req.body.Año_publicacion,
                Categoría: req.body.Categoría,
                Cantidad_disponible: req.body.Cantidad_disponible,
                Ubicacion: req.body.Ubicacion
            };

            let result = await Libros.update(updatedObject, { returning: true, where: { Id_libro: libroId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el libro con ID = " + libroId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Libro actualizado exitosamente con ID = " + libroId,
                    libro: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el libro con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un libro por su ID
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con ID = " + libroId,
                error: "404"
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con ID = " + libroId,
                libro: libro
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el libro con ID = " + req.params.id,
            error: error.message
        });
    }
}