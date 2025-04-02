import { useContext, useEffect, useState } from "react";
import { ButtonContained } from "../../../Common/Buttons/Buttons";
import "./formAddProducts.css";
import { productContext } from "../../../../context/productsContext/productContext";
import { useNavigate, useParams } from "react-router-dom";

export default function FormAddProducts() {
    const [productData, setProductData] = useState(new FormData());
    const { addNewProduct, getProduct, updateProduct, product } = useContext(productContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProduct() {
            if (id) {
                await getProduct(id);
            }
        }
        loadProduct();
    }, [id]);

    useEffect(() => {
        if (product) {
            const formData = new FormData();
            formData.append("name", product.name || "");
            formData.append("description", product.description || "");
            formData.append("category", product.category || "");
            formData.append("price", product.price || "");
            formData.append("stock", product.stock || "");
            setProductData(formData);
        }
    }, [product]);

    async function handleOnSubmit(event) {
      event.preventDefault();
    
      // Verifica que la imagen haya sido cargada y añadida al FormData
      if (!productData.has('file')) {
          alert("Debes cargar una imagen antes de enviar el formulario");
          return;
      }
      
      if (id) {
          await updateProduct(id, productData);
          setProductData(new FormData());
          navigate("/productsSeller");
      } else {
          await addNewProduct(productData);
          setProductData(new FormData());
          alert("El producto se agregó correctamente");
      }
    }

    function handleOnChange(event) {
      const { name, value } = event.target;

      // Crear una copia de productData sin borrar otros valores
      const newFormData = new FormData();
      productData.forEach((val, key) => newFormData.append(key, val));
  
      // Actualizar solo el campo modificado
      newFormData.set(name, value);
  
      setProductData(newFormData);
    }

    async function handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const newFormData = new FormData();
      productData.forEach((val, key) => newFormData.append(key, val));
      newFormData.append("file", file);
      newFormData.append('upload_preset', 'project-react-ecommerce');
      newFormData.append('cloud_name', 'dc16nkez3');
      
      try {
          const res = await fetch('https://api.cloudinary.com/v1_1/dc16nkez3/image/upload/w_500,h_500,c_fill,b_white/f_auto/q_auto', {
              method: 'POST',
              body: newFormData,
          });
          if(!res.ok){
            console.log('a ocurrido un error', res.status)
            return
          }
          const imageUrl = await res.json();
          console.log(imageUrl.url);
          
        
          const updatedFormData = new FormData();
          productData.forEach((val, key) => updatedFormData.append(key, val));
          updatedFormData.append('file', imageUrl.url); 
          setProductData(updatedFormData); 
          
      } catch (error) {
          console.log('Ha ocurrido un error', error.error);
      }
    }

    return (
        <div className="form-products-container">
            <h2 className="form-products-title">Añadir Producto</h2>
            <form className="product-form" onSubmit={handleOnSubmit}>
                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" placeholder="Nombre del producto" required onChange={handleOnChange} />
                    </div>
                    <div className="input-field-products">
                        <label htmlFor="description">Descripción:</label>
                        <input id="description" name="description" placeholder="Descripción del producto" required onChange={handleOnChange}></input>
                    </div>
                </div>

                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="category">Categoría:</label>
                        <input type="text" id="category" name="category" placeholder="Categoría del producto" required onChange={handleOnChange} />
                    </div>
                    <div className="input-field-products">
                        <label htmlFor="price">Precio:</label>
                        <input type="text" id="price" name="price" placeholder="Precio del producto" required onChange={handleOnChange} />
                    </div>
                </div>

                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="stock">Stock:</label>
                        <input type="text" id="stock" name="stock" placeholder="Stock disponible" required onChange={handleOnChange} />
                    </div>
                    <div className="input-field-products">
                        <label htmlFor="image">Imagen:</label>
                        <input type="file" id="file" name="file" required onChange={handleFileUpload} />
                    </div>
                </div>

                <ButtonContained text="Enviar" backgroundColor="#2713C2" colorText="#fff" width="250px" height="45px" type="submit" />
            </form>
        </div>
    );
}
