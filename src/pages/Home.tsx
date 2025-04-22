import { useNavigate } from 'react-router-dom';

import { recipesData } from "../data/recipes";
import { RiFilePaper2Line } from "react-icons/ri";
import { PiCactusFill } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";

import "../styles/Home.css";

export const Home = () =>{
    const navigate = useNavigate();

    const displayMemories = recipesData.map((memory) => (
        <div className="memoryContainer">
            <img className="memoryImg" src={memory.img[0]}></img>
            <div className="memoryInfo">
                <div>
                    <h2> {memory.name}</h2>
                    <div className='iconDate'>
                        <FaRegCalendarAlt />
                        <p className="memoryDate"> {memory.date}</p>
                    </div>
                    <p className="memoryNotes">{memory.description}</p>
                </div>
                <div>
                    <div className="line"></div>
                    <div className='recipeReadmore'>
                        {memory.link && (
                            <a href={memory.link} target="_blank" rel="noopener noreferrer" className='recipeContainer'>
                                <RiFilePaper2Line id="linkIcon"/>
                                <p> Recipe </p>
                            </a>
                        )}
                        <button className="readMoreBtn" onClick={() => navigate(`/dessert/${memory.id}`)} > Read More </button>
                    </div>
                </div>
            </div>
        </div>
    ));

    return(
        <div className="homePageOuter">
            <main className="homePage">
                <header className='cardBg'>
                    <div className="titleIcon">
                        <h1> Past Deserts </h1>
                        <PiCactusFill className="cactusIcon"/>
                    </div>
                    
                    <p> 
                        I started baking towards the end of 2024 and I wanted to 
                        keep a memory of each time I baked or made a desert*
                        (I put desert because I would mispell dessert a lot).
                        Check out what I made so far! 
                    </p>
                </header>
                
                <section>
                    <p className="dessertCounter">Total Desserts: {displayMemories.length}</p>
                </section>
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