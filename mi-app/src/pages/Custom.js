// Importaciones de React, hooks y estilos.
import React, { useState } from 'react'; // `useState` es el hook para manejar el estado local del componente.
import { useCart } from '../context/CartContext'; // Hook personalizado para acceder al contexto del carrito.
import './Custom.css'; // Estilos específicos para esta página.
import CustomWelcomeModal from '../components/CustomWelcomeModal'; // Modal de bienvenida.

/**
 * Componente Custom
 * Esta es la página principal para la personalización de prendas.
 * Permite al usuario elegir colores, diseños y tallas para crear un producto único.
 */
const Custom = () => {
  // Se extrae la función `addToCart` del contexto del carrito.
  // Esto permite que el componente pueda añadir productos al estado global del carrito.
  const { addToCart } = useCart();

  //ESTADO DEL COMPONENTE
  //Hooks `useState` para gestionar el estado local de la personalización.

  // `showWelcomeModal`: controla la visibilidad del modal de bienvenida.
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  // `selectedColor`: almacena el color de camiseta elegido por el usuario (ej: 'negro', 'blanco').
  const [selectedColor, setSelectedColor] = useState(null);
  // `frontDesign`: almacena el nombre del diseño seleccionado para la parte delantera.
  const [frontDesign, setFrontDesign] = useState(null);
  // `backDesign`: almacena el nombre del diseño seleccionado para la parte trasera.
  const [backDesign, setBackDesign] = useState(null);
  // `size`: almacena la talla seleccionada (por defecto 'M').
  const [size, setSize] = useState('M');

  // Objeto que funciona como una "base de datos" local para los diseños disponibles por color.
  const designs = {
    negro: {
      front: ['DiseñoA1', 'DiseñoA2', 'DiseñoA3', 'DiseñoA4', 'DiseñoA5'],
      back: ['DiseñoB1', 'DiseñoB2', 'DiseñoB3', 'DiseñoB4', 'DiseñoB5'],
    },
    blanco: {
      front: ['DiseñoC1', 'DiseñoC2', 'DiseñoC3', 'DiseñoC4', 'DiseñoC5'],
      back: ['DiseñoD1', 'DiseñoD2', 'DiseñoD3', 'DiseñoD4', 'DiseñoD5'],
    },
  };

  // Array con las tallas disponibles.
  const sizes = ['S', 'M', 'L', 'XL'];

  // Oculta el modal de bienvenida cuando el usuario hace clic en "Continuar".
  const handleContinue = () => setShowWelcomeModal(false);

  // Se ejecuta al seleccionar un color de camiseta.
  const handleColorSelect = (color) => {
    setSelectedColor(color); // Actualiza el color seleccionado.
    // Asigna automáticamente los primeros diseños disponibles para ese color como vista previa.
    setFrontDesign(designs[color].front[0]);
    setBackDesign(designs[color].back[0]);
  };
  
  // Permite al usuario volver a la pantalla de selección de color, reseteando las selecciones.
  const handleChangeColor = () => {
      setSelectedColor(null);
      setFrontDesign(null);
      setBackDesign(null);
  }

  // Actualizan el estado con la selección del usuario.
  const handleFrontDesignChange = (design) => setFrontDesign(design);
  const handleBackDesignChange = (design) => setBackDesign(design);
  const handleSizeChange = (selectedSize) => setSize(selectedSize);

  /**
   * Manejador para añadir el producto personalizado al carrito.
   */
  const handleAddToCart = () => {
    // Validación: se asegura de que todas las opciones hayan sido seleccionadas.
    if (!selectedColor || !frontDesign || !backDesign || !size) {
      alert('Por favor, completa tu diseño antes de añadirlo al carrito.');
      return;
    }

    // 1. creación de el objeto `customProduct`. Este objeto representa la prenda personalizada.
    //    Es importante que su estructura sea consistente con los productos estándar
    //    para que el carrito pueda manejarlos de forma uniforme.
    const customProduct = {
      // No tiene `_id` de la base de datos porque es un producto que aún no ha sido guardado.
      name: 'Prenda Customizada',
      price: 200.00, // Precio fijo para productos personalizados.
      image: `/img/${frontDesign}.png`, // Imagen principal que se mostrará en el carrito.
      
      // Propiedades específicas de la personalización
      isCustom: true, // MUY IMPORTANTE para que el `CartContext` lo trate de forma especial.
      color: selectedColor,
      diseñoFrontal: frontDesign,
      diseñoTrasero: backDesign,
      size: size, 
      quantity: 1,
    };

    // 2. Llamar a la función `addToCart` del contexto, pasándole el objeto del producto.
    addToCart(customProduct);
    alert('¡Tu prenda personalizada ha sido añadida al carrito!');
  };

  // Variable calculada: obtiene los diseños disponibles basándose en el color seleccionado.
  const availableDesigns = selectedColor ? designs[selectedColor] : { front: [], back: [] };

  // RENDERIZADO DEL COMPONENTE
  return (
    <>
      {/* Renderizado condicional: Muestra el modal solo si `showWelcomeModal` es true. */}
      {showWelcomeModal && <CustomWelcomeModal onContinue={handleContinue} />}

      <div className="customizer-container">
        <header className="customizer-header">
          <h1>Crea tu propio estilo</h1>
          <p>Personaliza tu camiseta con nuestros diseños exclusivos.</p>
        </header>

        {/* Solo muestra el contenido principal si el modal de bienvenida está oculto. */}
        {!showWelcomeModal && (
          <main className="customizer-main-content">
            {/* Área de previsualización de la camiseta. */}
            <section className="preview-area">
              <div className="tshirt-preview-wrapper">
                <h3 className="tshirt-preview-title">Vista Delantera</h3>
                <div className={`tshirt-display-panel ${selectedColor || 'default-bg'}`}>
                  {/* Muestra la imagen del diseño frontal si ha sido seleccionado. */}
                  {frontDesign && <img src={`/img/${frontDesign}.png`} alt="Preview Front" className="preview-image" />}
                </div>
              </div>
              <div className="tshirt-preview-wrapper">
                <h3 className="tshirt-preview-title">Vista Trasera</h3>
                <div className={`tshirt-display-panel ${selectedColor || 'default-bg'}`}>
                  {/* Muestra la imagen del diseño trasero si ha sido seleccionado. */}
                  {backDesign && <img src={`/img/${backDesign}.png`} alt="Preview Back" className="preview-image" />}
                </div>
              </div>
            </section>

            {/* Área de opciones de personalización. */}
            <section className="options-area">
              {/* PASO 1: SELECCIÓN DE COLOR (se muestra si aún no se ha elegido un color) */}
              {!selectedColor && (
                <div className="selection-step">
                  <h3 className="selection-title">Paso 1: Elige un color</h3>
                  <div className="color-selector">
                    {/* Opciones de color que llaman a `handleColorSelect` al hacer clic. */}
                    <div className="color-option-wrapper">
                       <div className="color-option negro" onClick={() => handleColorSelect('negro')}></div>
                       <span>Negro</span>
                    </div>
                    <div className="color-option-wrapper">
                       <div className="color-option blanco" onClick={() => handleColorSelect('blanco')}></div>
                       <span>Blanco</span>
                    </div>
                  </div>
                </div>
              )}

              {/* PASOS 2, 3 y 4: SELECCIÓN DE DISEÑOS Y TALLA (se muestran una vez elegido el color) */}
              {selectedColor && (
                <>
                  {/* Selección de diseño delantero */}
                  <div className="design-selection-group">
                    <h3 className="design-selection-title">Diseño Delantero</h3>
                    <div className="design-options-grid">
                      {/* Se mapean los diseños frontales disponibles para crear las opciones. */}
                      {availableDesigns.front.map((design) => (
                        <div
                          key={design}
                          className={`design-choice-box ${frontDesign === design ? 'selected' : ''}`}
                          onClick={() => handleFrontDesignChange(design)}
                        >
                          <img src={`/img/${design}.png`} alt={`${design} thumbnail`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selección de diseño trasero */}
                  <div className="design-selection-group">
                    <h3 className="design-selection-title">Diseño Trasero</h3>
                    <div className="design-options-grid">
                      {/* Se mapean los diseños traseros disponibles. */}
                      {availableDesigns.back.map((design) => (
                        <div
                          key={design}
                          className={`design-choice-box ${backDesign === design ? 'selected' : ''}`}
                          onClick={() => handleBackDesignChange(design)}
                        >
                          <img src={`/img/${design}.png`} alt={`${design} thumbnail`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selección de talla */}
                  <div className="size-selection-group">
                    <h3 className="size-selection-title">Elige tu Talla</h3>
                    <div className="size-options-grid">
                      {/* Se mapean las tallas disponibles. */}
                      {sizes.map((s) => (
                        <button
                          key={s}
                          className={`size-choice-btn ${size === s ? 'selected' : ''}`}
                          onClick={() => handleSizeChange(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Botones de acción */}
                   <button onClick={handleChangeColor} className="change-color-btn">Cambiar Color</button>
                  <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={!frontDesign || !backDesign}>
                    Añadir al carrito
                  </button>
                </>
              )}
            </section>
          </main>
        )}
      </div>
    </>
  );
};

export default Custom;
