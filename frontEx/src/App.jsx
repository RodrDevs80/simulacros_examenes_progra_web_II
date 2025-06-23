import Cabecera from "./components/Cabecera.jsx";
import { CategoriaDetalles } from "./components/CategoriaDetalles.jsx";
import ContainerCart from "./components/ContainerCart.jsx";
import { ContenedorCardCateg } from "./components/ContenedorCardCateg.jsx";
import FooterE from "./components/FooterE.jsx";
import Ofertas from "./components/Ofertas.jsx";
import { ProductoDetalle } from "./components/ProductoDetalle.jsx";
import Slider from "./components/Slider.jsx";
import { SliderLogos } from "./components/SliderLogos.jsx";
import { CuponProvider } from "./context/CuponProvider.jsx";
import { Home } from "./pages/Home.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <CuponProvider>
          <Cabecera />
          <Slider />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<ContenedorCardCateg />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/productos" element={<ContainerCart />} />
            <Route path="/categorias/:id" element={<CategoriaDetalles />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
          </Routes>
          <SliderLogos />
          <FooterE />
        </CuponProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
