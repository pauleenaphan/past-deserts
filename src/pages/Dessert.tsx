import { useParams } from "react-router-dom";
import { recipesData } from "../data/recipes";

import { FaArrowLeft } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
import "../styles/Dessert.css";

export const Dessert = () =>{
    const navigate = useNavigate();
    const { id } = useParams();
    const memory = recipesData.find((recipe) => recipe.id === Number(id));

    return (
        <div className="dessertOuterContainer">
            <main className="dessertPage">
                <FaArrowLeft id="backArrow" onClick={() =>{navigate(-1)}}/>
                {memory ? (
                    <>
                        <h1 className="dessertName">{memory.name}</h1>
                        <div className="dateLinkContainer">
                            <p className="dessertDate">Created on: {memory.date} |</p>
                            <p>
                                <a href={memory.link} target="_blank" rel="noopener noreferrer">
                                    Link to Recipe
                                </a>
                            </p>
                        </div>
                        <p className="dessertDesc" dangerouslySetInnerHTML={{ __html: memory.bodyArticle }}></p>
                        <img src={memory.img} alt={memory.name} />
                        <p className="imgCaption"> {memory.imgCaption} </p>
                    </>
                ) : (
                    <p>Memory not found.</p>
                )}
            </main>
        </div>
        
    );
}