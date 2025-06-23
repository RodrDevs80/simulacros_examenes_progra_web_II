import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import getCategorias from "../services/getCategorias";

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    searchQuery: "",
    showNew: false,
    showOffers: false,
  });
  const [categories, setcategories] = useState([]);

  /* const categories = [
    { value: "Zapatillas", label: "zapatillas" },
    { value: "Ropa Deportiva", label: "ropa deportiva" },
    { value: "Equipamiento", label: "equipamiento" },
    { value: "Suplementacion", label: "suplementacion" },
  ]; */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (onFilterChange) {
      onFilterChange({ ...filters, [name]: value });
    }
  };

  const toggleFilter = (filterName) => {
    const newValue = !filters[filterName];
    setFilters((prev) => ({
      ...prev,
      [filterName]: newValue,
    }));
    if (onFilterChange) {
      onFilterChange({ ...filters, [filterName]: newValue });
    }
  };
  useEffect(() => {
    getCategorias()
      .then((res) => {
        const nombresCategorias = res.map((cat) => {
          return {
            value: cat.nombre,
            label: cat.nombre.toLowerCase().split(" ")[0],
          };
        });
        setcategories(nombresCategorias);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Botón de Nuevos Productos */}
        <Button
          variant={filters.showNew ? "contained" : "outlined"}
          onClick={() => toggleFilter("showNew")}
        >
          Nuevos Productos
        </Button>

        {/* Botón de Ofertas */}
        <Button
          variant={filters.showOffers ? "contained" : "outlined"}
          color="secondary"
          onClick={() => toggleFilter("showOffers")}
        >
          Ofertas
        </Button>

        <Divider orientation="vertical" flexItem />

        {/* Selector de Categorías */}
        <TextField
          select
          label="Categorías"
          name="category"
          value={filters.category}
          onChange={handleChange}
          sx={{ minWidth: 150 }}
          size="small"
        >
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Buscador por palabras clave */}
        <TextField
          label="Buscar producto"
          name="searchQuery"
          value={filters.searchQuery}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 250 }}
          size="small"
          placeholder="Palabras clave..."
        />
      </Box>
    </Paper>
  );
};

export default FilterBar;
