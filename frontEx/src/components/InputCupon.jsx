import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { CuponContext } from "../context/cuponContext";
import { Link } from "react-router-dom";

export const InputCupon = () => {
  const { validarCupon, cuponValido, cupon, setCuponValido, setCupon } =
    useContext(CuponContext);
  const [codigoIngresado, setCodigoIngresado] = useState("");

  const handleAplicarCupon = () => {
    if (codigoIngresado.length === 0) {
      return;
    }
    validarCupon(codigoIngresado);
  };
  const handleDesaplicar = () => {
    setCuponValido(null);
    setCupon({});
    setCodigoIngresado("");
  };
  console.log(cuponValido);
  console.log(cupon);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: 3,
        padding: 2,
        background:
          "radial-gradient(circle,rgba(0, 204, 192, 1) 9%, rgba(148, 187, 233, 1) 100%)",
        borderRadius: 0.5,
      }}
    >
      <div className="relative bg-gray-100 rounded-2xl shadow-md p-3 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg">
        <div className="inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"></div>
        <input
          onChange={(e) => setCodigoIngresado(e.target.value)}
          value={codigoIngresado}
          type="text"
          name="codigo"
          id="codigo"
          className="w-full pl-8 pr-8 py-3 text-2x1 text-gray-700 font-bold bg-transparent rounded-lg focus:outline-none text-center"
          placeholder="Ingrese el código de su cupón..."
          disabled={cuponValido}
        />
        <div className="flex justify-center items-center">
          <button
            onClick={handleAplicarCupon}
            disabled={cuponValido}
            className={
              !cuponValido
                ? "right-1 m-1.5  top-1 bottom-1 px-6 bg-[#5044e4] text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5044e4] cursor-pointer"
                : "right-1 top-1 bottom-1 px-6 bg-[#9e9da8] text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5044e4] cursor-not-allowed"
            }
          >
            Aplicar Cupón
          </button>
          <button
            onClick={handleDesaplicar}
            className={
              cuponValido
                ? "right-1 m-1.5 top-1 bottom-1 px-6 bg-[#5044e4] text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5044e4] cursor-pointer"
                : "right-1 top-1 bottom-1 px-6 bg-[#9e9da8] text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5044e4] cursor-not-allowed"
            }
          >
            Desaplicar Cupón
          </button>
        </div>
      </div>
      <div className="mt-3">
        {cuponValido === null || codigoIngresado === "" ? null : cuponValido ? (
          <Box>
            <span className="font-bold">Cupón Aplicado: </span>
            {cupon.nombre} <br />
            <span className="font-bold">Porcentaje de Descuento: </span>
            {cupon.porcentajeDescuento}%{" "}
            <Link to={`/productos/${cupon.idProducto}`}>
              <Button>Ver producto afectado</Button>
            </Link>
          </Box>
        ) : (
          <Typography>
            <span className="font-bold">
              Código de cupón inválido o inactivo
            </span>
          </Typography>
        )}
      </div>
    </Box>
  );
};
