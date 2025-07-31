import ThreeCardRow from "./3CardRow";
import SquareRectangle from "./CuadradoRectangulo";
import Section2BG from "./Section2BG";
import "./Section2";
import styles from "./productsStyle.module.css"

export default function Section2({ idProducto }) {
  return (
    <div className={styles["home-container"]}>
      <Section2BG />
      {/* <div className="overlay-cards">
      {/* <div className="overlay-cards">
        <ThreeCardRow idProducto={idProducto}/>
      </div> */}
  
        <SquareRectangle idProducto={idProducto} />
      
    </div>
  );
}
