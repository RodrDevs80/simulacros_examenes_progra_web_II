import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";
import getProductoById from "../services/getProductoById";
import { calcularDescuento } from "../util/calcularDescuento";
import { CuponContext } from "../context/cuponContext";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export const ProductoDetalle = () => {
  const [productoDetalle, setProductoDetalle] = useState({});
  const { id } = useParams();
  const { cupon, cuponValido } = useContext(CuponContext);

  useEffect(() => {
    getProductoById(id)
      .then((res) => setProductoDetalle(res))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card
        sx={{
          margin: 2,
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          align="center"
          sx={{
            fontSize: {
              xs: "1rem", // 16px en móvil (0-599px)
              sm: "2.25rem", // 20px en tablet (600-899px)
              md: "4rem", // 24px en desktop (900-1199px)
            },
          }}
        >
          {productoDetalle.nombre}
        </Typography>
        <img src={productoDetalle.imagenUrl} alt={productoDetalle.nombre} />
        <Typography
          align="center"
          sx={{
            fontSize: {
              xs: "1rem", // 16px en móvil (0-599px)
              sm: "1.25rem", // 20px en tablet (600-899px)
              md: "1.5rem", // 24px en desktop (900-1199px)
              lg: "2.5rem", // 32px en pantallas grandes (1200-1535px)
              xl: "3rem",
            },
            marginTop: 4,
          }}
        >
          {productoDetalle.descripcion}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h3">
            {cuponValido && productoDetalle.id === cupon.idProducto ? (
              <>
                <span className="text-gray-400">
                  <strike>${productoDetalle.precio}</strike>
                </span>
                <span className="ml-1">Cupón Aplicado:</span>"{cupon.nombre}"
                <span>
                  {" "}
                  $
                  {calcularDescuento(
                    productoDetalle.precio,
                    cupon.porcentajeDescuento
                  )}
                </span>
                <span className="ml-2 text-blue-700">
                  {cupon.porcentajeDescuento}%
                </span>
                <LocalOfferIcon
                  sx={{ marginLeft: 1 }}
                  fontSize="medium"
                  color="error"
                />
              </>
            ) : productoDetalle.oferta ? (
              <>
                <span className="text-gray-400">
                  <strike>${productoDetalle.precio}</strike>
                </span>
                <span>
                  {" "}
                  $
                  {calcularDescuento(
                    productoDetalle.precio,
                    productoDetalle.descuento
                  )}
                </span>
                <span className="ml-2 text-blue-700">
                  {productoDetalle.descuento}%
                </span>
              </>
            ) : (
              `$${productoDetalle.precio}`
            )}
          </Typography>
          <Box
            align="left"
            sx={{
              fontSize: {
                xs: "1rem", // 16px en móvil (0-599px)
                sm: "1.25rem", // 20px en tablet (600-899px)
                md: "1.5rem", // 24px en desktop (900-1199px)
                lg: "2.5rem", // 32px en pantallas grandes (1200-1535px)
                xl: "3rem",
              },
              marginTop: 4,
            }}
          >
            <span className="font-bold block">Especificaciones:</span>{" "}
            <ul>
              {Object.keys(productoDetalle).length !== 0 &&
                productoDetalle.especificaciones
                  .split(".")
                  .map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </Box>
        </Box>
        <Button variant="outlined" sx={{ margin: 5 }}>
          <Link to={"/"}>Volver</Link>
        </Button>
      </Card>
    </>
  );
};
