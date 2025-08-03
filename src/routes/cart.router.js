import CustomRouter from "./custom.router.js";
import { cartController } from "../controllers/cart-controller.js"
import { checkRoles } from "../middlewares/checkRoles.js";

class router extends CustomRouter{
    init() {

        // ruta post para crear carritos 
        this.post('/', checkRoles(['ADMIN']), cartController.crearCarritos)

        //metodo para agregar productos al carrito 
        this.post('/', checkRoles(['USER','ADMIN']), cartController.agregarProductoAlCarrito) 

        // Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. 
        // Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
        this.get('/', checkRoles(['USER','ADMIN']), cartController.traerTodosLosProductosDeUnCarritoPopulate)

        // ruta para listar todos los carritos
        this.get('/', checkRoles(['ADMIN']), cartController.listarTodosLosCarritos)

        //PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
        this.put('/', checkRoles(['USER','ADMIN']), cartController.actualizarCantProductosDeCarrito)

        // DELETE api/carts deberá eliminar todos los productos del carrito 
        this.delete('/', checkRoles(['USER','ADMIN']), cartController.eliminarTodosLosProductosDeCarrito)

        // DELETE api/carts/products/:pid deberá eliminar del carrito el producto seleccionado.
        this.delete('/products/:pid', checkRoles(['USER','ADMIN']), cartController.eliminarProductoSeleccionadoDeCarrito)

        this.post('/purchase', checkRoles(['USER','ADMIN']), cartController.completePurchase)
    }
}

export default new router() 