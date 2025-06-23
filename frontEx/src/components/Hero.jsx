import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import { LetrasNeon } from "./LetrasNeon.jsx";
import Switch from "./Switch.jsx";

export const Hero = ({ infoHero, estado, setEstado }) => {
  return (
    <>
      <Card
        elevation={4}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // 1 columna en mobile
            sm: "1fr", // 2 columnas en tablet
            md: "repeat(2, 1fr)",
          },
          gridTemplateRows: "1fr",
          margin: {
            xs: "20px",
            sm: "15px",
            lg: "22px",
          },
          padding: "20px",
          border: "1px solid rgba(0,0,0,0.3)",
          marginBottom: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
            backgroundColor: estado ? "#FF4858" : "#010a01",
            padding: "30px",
            borderRadius: "10px",
            gap: 4,
          }}
        >
          {estado ? (
            <Typography
              gutterBottom
              className="titulo"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                fontWeight: "600",
                textAlign: "center",
                fontFamily: "Orbitron",
                filter:
                  "drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.3)) drop-shadow(-3px -3px 3px rgba(255, 255, 255, 0.5))",
                color: "white",
              }}
            >
              OFERTA ESPECIAL!!!
            </Typography>
          ) : (
            <LetrasNeon texto={`Calidad premium a un precio irresistible 💎`} />
          )}
          <Typography
            variant="h5"
            className={estado ? "text-[#000]" : "text-[#fff]"}
            style={{ fontFamily: "Pacifico", fontWeight: "800" }}
          >
            Hasta 40% OFF!!!
          </Typography>
          <Typography className={estado ? "text-[#000]" : "text-[#fff]"}>
            {estado
              ? "⏳ ¡Solo quedan pocas unidades! Aprovecha antes de que se agote."
              : "🔥¡Oferta por tiempo limitado! Ahorra 💵💰 en tu compra."}
          </Typography>
          <ButtonGroup>
            <Button variant="contained"> 🛍️comprar ahora</Button>
            <Button>Saber Mas</Button>
          </ButtonGroup>
          <Switch estado={estado} setEstado={setEstado} />
        </Box>
        <CardMedia
          component="img"
          image={infoHero.img}
          alt={infoHero.titulo}
          sx={{
            width: "100%",
            margin: "10px",
            "&:hover": {
              scale: "1.02",
            },
            transition: "all 0.3s ease",
          }}
        ></CardMedia>
      </Card>
    </>
  );
};
