import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductCarousel from "../components/ProductCarousel";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/productos")
      .then((response) => {
        setProductos(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  return (
    <div className="home-dark">
      <ProductCarousel />
      <div style={{ padding: "50px" }}>
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          Customiza
        </h2>

        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <img
              src="/img/modelo.jpeg" 
              alt="Customiza"
              style={{
                width: "100%",
                maxWidth: "350px",
                borderRadius: "30px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            />
          </Col>

          <Col md={6}>
            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.5",
                textAlign: "justify",
                marginBottom: "30px",
              }}
            >
              Mi bro, si estás buscando una prenda que realmente te represente,
              que hable por ti y no sea igual a la de los demás, este es tu
              lugar. Aquí no se trata solo de comprar ropa, se trata de crear tu
              propio estilo. En nuestra tienda puedes customizar tus prendas a
              tu gusto, elegir los colores, detalles y acabados que más te
              identifiquen.
              <br />
              <br />
              La idea es que cada prenda sea una extensión de tu personalidad:
              única, auténtica y con tu sello propio. Ya sea que busques algo
              más street, casual o con un toque elegante, nosotros te ayudamos a
              llevar tu idea a la realidad.
              <br />
              <br />
              Así que no lo pienses más, mi bro. Si lo que quieres es marcar la
              diferencia y vestirte con flow propio, este es el sitio perfecto
              para hacerlo. Aquí tú decides cómo se ve tu estilo.
            </p>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="dark"
                size="lg"
                onClick={() => navigate("/custom")}
                style={{
                  borderRadius: "10px",
                  padding: "10px 30px",
                  fontWeight: "bold",
                }}
              >
                Custom
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ padding: "50px 0", backgroundColor: "#000", color: "white" }}>
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          Nuestras Sedes
        </h2>

        <Row className="justify-content-center">
          <Col md={4} className="text-center mb-4">
            <img
              src="/img/ubicacion1.jpeg" 
              alt="Sede 1"
              style={{
                width: "100%",
                maxWidth: "460px",
                borderRadius: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                marginBottom: "20px",
              }}
            />
            <Button
              variant="light"
              size="lg"
              onClick={() =>
                window.open("https://www.google.com/maps", "_blank")
              }
              style={{
                borderRadius: "10px",
                padding: "10px 30px",
                fontWeight: "bold",
              }}
            >
              Ubicación
            </Button>
          </Col>

          <Col md={4} className="text-center mb-4">
            <img
              src="/img/ubicacion2.jpeg"
              alt="Sede 2"
              style={{
                width: "100%",
                maxWidth: "320px",
                borderRadius: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                marginBottom: "20px",
              }}
            />
            <Button
              variant="light"
              size="lg"
              onClick={() =>
                window.open("https://www.google.com/maps", "_blank")
              }
              style={{
                borderRadius: "10px",
                padding: "10px 30px",
                fontWeight: "bold",
              }}
            >
              Ubicación
            </Button>
          </Col>

     
          <Col md={4} className="text-center mb-4">
            <img
              src="/img/ubicacion3.jpeg" 
              alt="Sede 3"
              style={{
                width: "100%",
                maxWidth: "430px",
                borderRadius: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                marginBottom: "20px",
              }}
            />
            <Button
              variant="light"
              size="lg"
              onClick={() =>
                window.open("https://www.google.com/maps", "_blank")
              }
              style={{
                borderRadius: "10px",
                padding: "10px 30px",
                fontWeight: "bold",
              }}
            >
              Ubicación
            </Button>
          </Col>
        </Row>
      </div>

      <Container className="mt-1 pt-3">
        <h2 className="text-center text-black mb-4">Nuestra Colección</h2>
        <Row>
          {productos.map((producto) => (
            <Col key={producto.idproducto} md={4} className="mb-4">
              <ProductCard
                idproducto={producto.idproducto}
                nombreproducto={producto.nombreproducto}
                priceproducto={producto.priceproducto}
                imageproducto={producto.imageproducto}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;