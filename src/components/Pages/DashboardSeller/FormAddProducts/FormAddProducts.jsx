import { useContext, useEffect, useState } from "react";
import { ButtonContained } from "../../../Common/Buttons/Buttons";
import "./formAddProducts.css";
import { productContext } from "../../../../context/productsContext/productContext";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorAlert, InfoAlert, SuccessAlert } from "../../../Common/Alerts/Alerts";

export default function FormAddProducts() {
    const [productData, setProductData] = useState(new FormData());
    const [loadImage,setLoadImage] = useState(false)
    const { addNewProduct, getProduct, updateProduct, product,alerts,setAlerts } = useContext(productContext);
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

    useEffect(()=>{
      if(loadImage === true){
        setAlerts({...alerts,info:'Cargando imagen...'})
      }else{
        setAlerts({...alerts,info:""})
      }
    },[loadImage])

    async function handleOnSubmit(event) {
      event.preventDefault();
    
      // Verifica que la imagen haya sido cargada y añadida al FormData
      if (!productData.has('file') ) {
        console.log('no hay imagen')
        //   setAlerts({...alerts,info:'Espera un momento, cargando imagen...'})
          return;
      }
      
      if (id) {
          await updateProduct(id, productData);
          setProductData(new FormData());
          navigate("/productsSeller");
      } else {
          const res = await addNewProduct(productData);
          setProductData(new FormData());
          
          
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

    async function removeBackground(file) {
        const formData = new FormData();
        formData.append("image_file", file);
        formData.append("size", "auto");
    
        try {
            const res = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: {
                    "X-Api-Key": "mqVS62XPUsEP6EQoDn3waA7Y",
                },
                body: formData,
            });
    
            if (!res.ok) {
                // console.log("Error al quitar el fondo", res.status);
                return null;
            }
    
            const blob = await res.blob();
            return URL.createObjectURL(blob); // URL de la imagen sin fondo
        } catch (error) {
            console.error("Error en remove.bg", error);
            return null;
        }
    }
    async function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file){
            return
        }
        setLoadImage(true)
    
        // 1️⃣ Primero, eliminar el fondo con remove.bg
        const imageUrlWithoutBg = await removeBackground(file);
        if (!imageUrlWithoutBg ) {
            setLoadImage(false)
           return 
        }
    
        // 2️⃣ Convertir la imagen sin fondo en un Blob para subirla a Cloudinary
        const response = await fetch(imageUrlWithoutBg);
        const blob = await response.blob();
        const fileWithoutBg = new File([blob], "image.png", { type: "image/png" });
    
        // 3️⃣ Subir la imagen procesada a Cloudinary
        const newFormData = new FormData();
        productData.forEach((val, key) => newFormData.append(key, val));
        newFormData.append("file", fileWithoutBg);
        newFormData.append("upload_preset", "project-react-ecommerce");
        newFormData.append("cloud_name", "dc16nkez3");
    
        try {
            
            const res = await fetch("https://api.cloudinary.com/v1_1/dc16nkez3/image/upload", {
                method: "POST",
                body: newFormData,
            });
    
            if (!res.ok) {
                setLoadImage(false)
                // console.log("Error al subir la imagen", res.status);
                return;
            }
    
            const imageUrl = await res.json();
            
            // 4️⃣ Guardar la URL final en el estado
            const updatedFormData = new FormData();
            productData.forEach((val, key) => updatedFormData.append(key, val));
            updatedFormData.append("file", imageUrl.url);
            setProductData(updatedFormData);
            setLoadImage(false)
            setAlerts({...alerts,info:'Imagen cargada'})
            return
            
           
    
           
        } catch (error) {
            // console.log("Ha ocurrido un error al subir la imagen", error);
            return
        }
    }
    
    

    return (
        <div className="form-products-container">
            <h2 className="form-products-title">Añadir Producto</h2>
            <form className="product-form" onSubmit={handleOnSubmit}>
                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" value={productData.get('name') || ''} placeholder="Nombre del producto" required onChange={handleOnChange} />
                    </div>
                    <div className="input-field-products">
                        <label htmlFor="description">Descripción:</label>
                        <input id="description" name="description" value={productData.get('description') ||''} placeholder="Descripción del producto" required onChange={handleOnChange}></input>
                    </div>
                </div>

                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="category">Categoría:</label>
                        <select className="select-category-form" onChange={handleOnChange} required name="category" value={productData.get('category') ||''}  >
                            <option value='' disabled >Categorias</option>
                            <option value='artesanias' >artesanias</option>
                            <option value='pinturas' >pinturas</option>
                            <option value='cocina' >cocina</option>
                            <option value='accesorioas' >accesorios</option>
                        </select>
                        {/* <input type="text" id="category" name="category" placeholder="Categoría del producto" required onChange={handleOnChange} /> */}
                    </div>
                    <div className="input-field-products">
                        <label htmlFor="price">Precio:</label>
                        <input type="text" id="price" name="price" value={productData.get('price') ||''} placeholder="Precio del producto" required onChange={handleOnChange} />
                    </div>
                </div>

                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" id="stock" name="stock" value={productData.get('stock') ||''} placeholder="Stock disponible" required onChange={handleOnChange} />
                    </div>
                    <div className="input-field-products">
                        <label htmlFor="image">Imagen:</label>
                        <input type="file" id="file" name="file" required onChange={handleFileUpload} />
                    </div>
                </div >
                <div className="alerts-form-add-products" >
                    {alerts.success && <SuccessAlert type="success" text={alerts.success} onClose={() => setAlerts({ ...alerts, success: "" })} />}
                                {alerts.error && <ErrorAlert type="error" text={alerts.error} onClose={() => setAlerts({ ...alerts, error: "" })} />}
                                {alerts.info && <InfoAlert type="info" text={alerts.info} onClose={() => setAlerts({ ...alerts, info: "" })} />}
                </div>
                  <div className="btn-form-add-products-container" >
                    
                <ButtonContained text="Enviar" backgroundColor="#2713C2" colorText="#fff" width="250px" height="45px" type="submit" />
                  </div>
            </form>
        </div>
    );
}
