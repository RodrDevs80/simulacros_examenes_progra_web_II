import React from "react";
import { useState } from "react";
import infoHero from "../mocks/infoHero";
import { BotonFlotante } from "../components/BotonFlotante";
import FilterBar from "../components/FilterBar";
import ContainerCart from "../components/ContainerCart";
import { Hero } from "../components/Hero";
import { InputCupon } from "../components/InputCupon";

export const Home = () => {
  const [estado, setEstado] = useState(true);
  return (
    <>
      <BotonFlotante />
      <FilterBar />
      <InputCupon />
      <ContainerCart />
      <Hero infoHero={infoHero} estado={estado} setEstado={setEstado} />
    </>
  );
};
