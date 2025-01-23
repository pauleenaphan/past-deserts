import { useNavigate } from 'react-router-dom';

import { recipesData } from "../data/recipes";
import { RiFilePaper2Line } from "react-icons/ri";
import { PiCactusFill } from "react-icons/pi";

import "../styles/Home.css";

export const Home = () =>{
    const navigate = useNavigate();

    const displayMemories = recipesData.map((memory) => (
        <div className="memoryContainer" onClick={() => navigate(`/dessert/${memory.id}`)} >
            <div className="recipeTitleLink">
                <div className="recipeTitleDate">
                    <h2> {memory.name}</h2>
                    <p className="memoryDate"> {memory.date}</p>
                </div>
                {memory.link && (
                    <a href={memory.link} target="_blank" rel="noopener noreferrer">
                        <RiFilePaper2Line id="linkIcon"/> {/* Icon is now wrapped by the link */}
                    </a>
                )}
            </div>
            <p className="memoryNotes">{memory.description}</p>
            <div className="line"></div>
            <img className="memoryImgs" src={memory.img}></img>
        </div>
    ));

    return(
        <div className="homePageOuter">
            <main className="homePage">
                <header>
                    <div className="titleIcon">
                        <h1> Past Deserts </h1>
                        <PiCactusFill className="cactusIcon"/>
                    </div>
                    
                    <p> 
                        I started baking more towards the end of 2024 and I wanted to 
                        keep a memory of each time I baked or made a desert*
                        (I put desert because I would mispell dessert a lot).
                        Check out what I made so far! 
                    </p>
                </header>
                

                {/* Display the fetched memories */}
                <div className="allMemoriesContainer">
                    {displayMemories.length > 0 ? (
                        displayMemories // Render the memories with images
                    ) : (
                        <p>No memories found</p>
                    )}
                </div>
            </main>

        </div>
        
    )
}