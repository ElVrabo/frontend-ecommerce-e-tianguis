import "./listProducts.css"
import Aside from "../../../Aside/Aside";
import TableProducts from "./TableProducts";

 


 export default function ListProductsSeller(){
    return (
           <section className="listProducts-seller-container" >
           <Aside/>
         {/* <div className="table-products-seller" > */}
         <TableProducts/>
         {/* </div> */}
           </section>
    )
 } 