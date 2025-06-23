import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ShoppingCartRounded } from "@mui/icons-material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { StarComp } from "./StarComp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router-dom";
import { calcularDescuento } from "../util/calcularDescuento";

export default function CartProduct({
  id,
  img,
  titulo,
  nombreProducto,
  descripcion,
  precio,
  calificacion,
  oferta,
  descuento,
  cupon,
  cuponValido,
}) {
  console.log(cupon, cuponValido);
  return (
    <Card
      elevation={4}
      sx={{
        width: "90%",
        border: "1px solid rgba(0,0,0,0.3)",
        height: {
          md: "420px", // 60% en pantallas medianas (laptop)
        },
        display: "flex",
        flexDirection: "column", // Esto hace que los elementos se apilen verticalmente
      }}
    >
      <CardMedia
        sx={{
          height: 140,
          "&:hover": {
            scale: "1.1",
          },
        }}
        image={img}
        title={titulo}
      />
      <CardContent
        sx={{
          flexGrow: 1, // Esto hace que el CardContent ocupe todo el espacio disponible
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {nombreProducto}{" "}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {descripcion}
        </Typography>
        <Typography>
          {cuponValido && id === cupon.idProducto ? (
            <>
              <span className="text-gray-400">
                <strike>${precio}</strike>
              </span>
              <span className="ml-1">Cupón Aplicado:</span>"{cupon.nombre}"
              <span>
                {" "}
                ${calcularDescuento(precio, cupon.porcentajeDescuento)}
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
          ) : oferta ? (
            <>
              <span className="text-gray-400">
                <strike>${precio}</strike>
              </span>
              <span> ${calcularDescuento(precio, descuento)}</span>
              <span className="ml-2 text-blue-700">{descuento}%</span>
              <LocalOfferIcon fontSize="medium" color="success" />
            </>
          ) : (
            `$${precio}`
          )}{" "}
        </Typography>
        <StarComp starNum={calificacion} />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          sx={{
            "&:hover": {
              scale: "1.1",
            },
          }}
          startIcon={<ShoppingCartRounded />}
        >
          Comprar
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{
            "&:hover": {
              scale: "1.1",
            },
          }}
          startIcon={<ThumbUpOffAltIcon />}
        >
          Like
        </Button>
        <Link to={`/productos/${id}`}>
          <Button
            variant="contained"
            size="small"
            sx={{
              "&:hover": {
                scale: "1.1",
              },
            }}
          >
            Detalle
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
