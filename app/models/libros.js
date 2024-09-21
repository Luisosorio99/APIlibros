module.exports = (sequelize, Sequelize) => {
    const Libros = sequelize.define('libros', {
        Id_libro: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        Titulo: {
            type: Sequelize.STRING(100) 
        },
        Id_autor: {
            type: Sequelize.INTEGER 
        },
        Isbn: {
            type: Sequelize.STRING(13) 
        },
        Editorial: {
            type: Sequelize.STRING(50) 
        },
        Año_publicacion: {
            type: Sequelize.DATE 
        },
        Categoría: {
            type: Sequelize.STRING(50) 
        },
        Cantidad_disponible: {
            type: Sequelize.INTEGER 
        },
        Ubicacion: {
            type: Sequelize.STRING(100) 
        }
    });
    
    return Libros;
};