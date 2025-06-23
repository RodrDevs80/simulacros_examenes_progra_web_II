import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function CategoriaCard({ img, titulo, id }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 300, // Altura mínima
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia sx={{ height: 140, width: 400 }} image={img} title={titulo} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {titulo}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        {" "}
        {/* Empuja los botones al final */}
        <Button size="small">
          <Link to={`/`}>Home</Link>
        </Button>
        <Button size="small">
          <Link to={`/categorias/${id}`}>Mas info</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
