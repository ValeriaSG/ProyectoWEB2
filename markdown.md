# Función y expliación del código
## Función del archivo index.html

En este archivo vamos a tener varios elementos que forman parte de neustra interfaz. Ahi se puede ver que se tiene el nombre de la pagina, un apartado llamado carrito que cuenta con un botón de Finalizar compra, otro botón que está debajo del titulo de la página que tiene el nombre de iniciar sesión. 

Tambien vamos a tener los formularios para que el usuario-comprador y el usuario-vendedor puedan acceder a su interfaz de la página. Se cuenta tambien con un panel de administracion y transacciones, esto solo le aparecerá al vendedor cuando inicie sesión y una vez que cierre sesión estos se van a ocultar. 

## Función del archivo Script.js

En nuestro archivo Script.js se puede ver en las primeras lineas de códido que estamos generando y agregando dinamicamente los productos, esto con el objetivo de irlas generando mediante la creación de variables para despues para realizar alguna función.Como se podrá observar se intento ir comentando las lineas del codigo dependiendo de la función que tengan, ya que para evitar confusiones la mayoria del código está comentado y así cualquier problema que se tenga ya se sabe a que linea acudir. 

### Manejo del stock
En nuestra linea 17 tenemos un comentario que nos idica que a partir de ahi se maneja nuestro stock en la tienda, este se va a mostrar dentro de la información de cada pproducto para que el cliente pueda verlo. 
Primero estamos haciendo la funcion addToCart para que cuando el usuario-cliente intente añadir algun producto y este no haya iniciado sesión le salga una alerta diciendole que debe iniciar sesión para agregar productos al carrito.

Despues tenemos la estructura para verificar si hay stock, si aun el stock es mayor a 0 este producto se podrá añadir al carrito y el cliente va a ver como se resta dependiendo de cuantas unidades agregue a su carrito.

Aqui mismo se maneja con la funcion updateCart la limpia del carrito en caso de que el carrito no tenga ningun producto añadido, si no es así entonces en el carrito se van a mostrar los detalles del producto agregado, tal como se indica en la linea 62, pero tambien se le está agregando un botón de eliminar el producto po si el comprador ya no lo quiere pues lo pueda quitar sin problema alguno. Con la función removeFromCart estamos indicando que si el producto se elimina del carrito, el stock que se tomó para irse al carrito, regrese nuevamente, es decir, si al agregar se resto al stock, al eliminarlo del carrito se vuelve a agregar al stock. 

Hasta aquí finaliza el manejo del stock y las funciones que están dentro del carrito para que el usuario-comprador pueda interactuar de manera rapida y sencilla sn rpoblema alguno. 

### Manejo y control del inicio de sesión del comprador
Esta parte va a iniciar enla linea 90 del código. Lo primero que se está hacendo es hacer la funcion fectchUsers, esto con la finalidad de obtener a los usuarios mediante el servidor JSON. En nuestra linea 94 agregamosu un console.log para que nosotros pudieramos ver paso a paso si fallaba algo o si todo funcionaba correctamente, por que lo abriamos la página en el navegador, apretabamos F12 y seleccionabamos la opción "console" para que desde ahi se viera lo que estaba haciendo nuestro código. Despues de esto definimos de donde se van a obtener nuestros usuarios, los cuales estaban en "users" en un archivo data.json, más tarde hablaremos de ello. Continuamos viendo si obtiene los usuarios o si tiene algun problema con ello, realmente el uso del console.log nos facilitó mucho encontrar los errores que se iban presentando. 

Bien, una vez que definimos el como obtener los usuarios, ahora vamos a guardar a los nuevos usuarios en el servidor JSON, la estructura es muy similar a la anterior, 



