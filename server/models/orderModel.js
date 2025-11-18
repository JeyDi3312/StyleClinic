const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    // Cuando implementemos usuarios, aquí irá la referencia al usuario
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        // El ID del producto, que puede ser estandar o personalizado
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          // Le dice a Mongoose a que colección (tabla) referirse
          refPath: 'orderItems.onModel',
        },
        // Este campo indica a que modelo pertenece el ID de arriba
        onModel: {
          type: String,
          required: true,
          enum: ['Product', 'CustomProduct'], // El ID pertenece a la colección 'Product' o 'CustomProduct'
        },
      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Esto crea los campos createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model('Order', orderSchema);
