import CustomRouter from "./custom.router.js";
import { cartController } from "../controllers/cart-controller.js"
import passport from "passport";

class router extends CustomRouter{
    init() {
        this.use(passport.authenticate("current",{ session: false }))

        //ruta post para crear carritos 
        // this.post('/', ['PUBLIC'], cartController.crearCarritos)

        //metodo para agregar productos al carrito 
        this.post('/', ['PUBLIC'], cartController.agregarProductoAlCarrito) 

        // Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. 
        // Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
        this.get('/', ['PUBLIC'], cartController.traerTodosLosProductosDeUnCarritoPopulate)

        //ruta para listar todos los carritos
        // this.get('/', ['PUBLIC'], cartController.listarTodosLosCarritos)

        //PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
        this.put('/', ['PUBLIC'], cartController.actualizarCantProductosDeCarrito)

        // DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
        this.delete('/', ['PUBLIC'], cartController.eliminarTodosLosProductosDeCarrito)

        // DELETE api/carts/products/:pid deberá eliminar del carrito el producto seleccionado.
        this.delete('/products/:pid', ['PUBLIC'], cartController.eliminarProductoSeleccionadoDeCarrito)
    }
}

const cartRouter = new router() 
export default cartRouter