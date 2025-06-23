import axios from "axios";

const getCategorias = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/categorias/activos");
        const data = res.data;
        return data.data
    } catch (err) {
        throw new Error(err.message);
    }

}

export default getCategorias;