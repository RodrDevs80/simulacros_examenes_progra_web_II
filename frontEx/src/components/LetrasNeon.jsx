import "../css/letrasNeon.css";

export const LetrasNeon = ({ texto }) => {
  return (
    <h3 className="neonText text-[38px] text-center opacity-100 transition-opacity duration-300 ease-in-out">
      {texto}
    </h3>
  );
};
