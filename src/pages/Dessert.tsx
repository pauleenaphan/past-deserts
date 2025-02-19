import { useParams } from "react-router-dom";
import { recipesData } from "../data/recipes";

import { FaArrowLeft } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
import "../styles/Dessert.css";
import { useEffect } from "react";

export const Dessert = () =>{
    const navigate = useNavigate();
    const { id } = useParams();
    const memory = recipesData.find((recipe) => recipe.id === Number(id));

    useEffect(() =>{
        window.scrollTo(0, 0); // Scrolls to the top of the page
        if (memory) {
            document.title = `Past Desserts | ${memory.name}`;
        }
    }, [memory])

    return (
        <div className="dessertOuterContainer">
            <div className="arrowContainer">
                <FaArrowLeft id="backArrow" onClick={() =>{navigate(-1)}}/>
            </div>
            
            <main className="dessertPage">
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
                        <div className="dessertImgContainer">
                            {memory.img.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`${memory.name} image ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        
                        <p className="imgCaption"> {memory.imgCaption} </p>
                    </>
                ) : (
                    <p>Memory not found.</p>
                )}
            </main>
        </div>
        
    );
}