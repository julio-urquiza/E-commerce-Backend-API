import CustomRouter from "./custom.router.js"
import productController from "../controllers/product-controller.js"
import checkRoles from "../middlewares/checkRoles.js"

class router extends CustomRouter{
    init() {
        //ruta get que me retorna todo el listado de products
        // Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
        // -limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
        // -page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
        // -query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
        // -sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
        this.get('/', checkRoles(['PUBLIC']), productController.traerDeProductosFormateados)

        //ruta get retorna el un producto por el id
        this.get('/:id', checkRoles(['PUBLIC']), productController.traerProductoPorId)

        //ruta post para products
        this.post('/', checkRoles(['ADMIN']), productController.crearProducto)

        //ruta put para modificar productos
        this.put('/:id', checkRoles(['ADMIN']), productController.modificarProducto)

        //ruta put para eliminar productos
        this.delete('/:id', checkRoles(['ADMIN']), productController.eliminarProducto)
    }
}

export default new router()


