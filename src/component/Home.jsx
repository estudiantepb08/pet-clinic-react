import { Imagenes } from "./Imagenes";

export const Home = ({ dataImagenes }) => {
 
    return (
        <>
            <div className="container my-4">
                <div className="row">
                {dataImagenes.map(({ id, imagen, titulo, descripcion }) => (<Imagenes 
                                                                        key={ id } 
                                                                        id={id}
                                                                        imagen={ imagen } 
                                                                        titulo={ titulo } 
                                                                        descripcion={ descripcion }                                                                       
                                                                        />))}  
                </div>
            </div>
        </>
    );
}