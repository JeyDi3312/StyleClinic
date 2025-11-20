const mongoose = require('mongoose');

/**
 * Esquema de Pedido (orderSchema)
 * Este esquema define la estructura de los pedidos realizados por los clientes.
 * Es uno de los esquemas más complejos ya que contiene subdocumentos
 * y referencias a otros modelos.
 */
const orderSchema = new mongoose.Schema(
  {

    // Artículos del Pedido
    // `orderItems` es un array de objetos, donde cada objeto es un producto dentro del pedido.
    orderItems: [
      {
        name: { type: String, required: true },       // Nombre del producto
        quantity: { type: Number, required: true },    // Cantidad comprada
        image: { type: String, required: true },       // URL de la imagen
        price: { type: Number, required: true },       // Precio al momento de la compra

        // Referencia Dinámica al Producto 
        // El `product` puede ser un producto del catálogo normal o un producto personalizado.
        product: {
          type: mongoose.Schema.Types.ObjectId, // El ID del producto.
          required: true,
          refPath: 'orderItems.onModel', // `refPath` le dice a Mongoose que el modelo de referencia está en otro campo.
        },
        // `onModel` especifica a qué colección pertenece el `product` ID de arriba.
        onModel: {
          type: String,
          required: true,
          enum: ['products', 'customproducts'], // El ID puede venir del modelo 'Product' o 'CustomProduct'.
        },
      },
    ],

    // Dirección de Envío 
    // Objeto que almacena toda la información de la dirección de envío del pedido.
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    // Precio Total 
    // El costo total del pedido, incluyendo todos los artículos.
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    // Estado del Pago 
    isPaid: {
      type: Boolean,
      required: true,
      default: false, 
    },
    paidAt: {
      type: Date, // La fecha en que se realizó el pago.
    },

    // Estado del Envío 
    isDelivered: {
      type: Boolean,
      required: true,
      default: false, 
    },
    deliveredAt: {
      type: Date, // La fecha en que se completó el envío.
    },
  },
  {
    // Opciones del Esquema 
    timestamps: true, // Esta opción crea automáticamente los campos `createdAt` y `updatedAt`.
  }
);


 // Exportación del Modelo
 // Se crea y exporta el modelo 'Order' para interactuar con la colección
 // 'orders' en MongoDB.
 
module.exports = mongoose.model('Order', orderSchema);
