import ThreeCardRow from "./3CardRow";
import SquareRectangle from "./CuadradoRectangulo";
import Section2BG from "./Section2BG";
import "./Section2";

export default function Section2({ idProducto }) {
  return (
    <div className="home-container">
      <Section2BG />
      {/* <div className="overlay-cards">
      {/* <div className="overlay-cards">
        <ThreeCardRow idProducto={idProducto}/>
      </div> */}
  
        <SquareRectangle idProducto={idProducto} />
      
    </div>
  );
}
