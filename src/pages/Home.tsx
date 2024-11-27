import { useEffect, useState } from "react";
import { addMemory, getMemories } from "../firebase/firebaseUtils";
import "../styles/Home.css";

import { RiFilePaper2Line } from "react-icons/ri";

export const Home = () => {
    const [newMemForm, setNewMemForm] = useState<boolean>(false);
    const [adminPass, setAdminPass] = useState<string>("");
    // Group all fields into a single state object
    const [formData, setFormData] = useState({
        title: "",
        notes: "",
        link: "",
        date: "",
        imgs: [] as File[], // State to store multiple images
    });

    const [memories, setMemories] = useState<{
        id: string;
        title: string;
        notes: string;
        link: string;
        date: string;
        imgs: string[]; // Base64 strings
    }[]>([]);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { title, notes, link, date, imgs } = formData;

        if(adminPass != import.meta.env.VITE_ADMIN_PASSWORD){
            throw new Error("Admin password is not correct")
        }

        addMemory(title, notes, link, date, imgs);

        setNewMemForm(false);
        setFormData({ title: "", notes: "", link: "", date: "", imgs: []});
        // Optionally, update the UI immediately by adding the new memory
        const newMemory = {
            title,
            notes,
            link,
            date,
            imgs: imgs.map(img => URL.createObjectURL(img)), // Convert file objects to previewable URLs
            id: Date.now().toString(), // Assign a temporary ID (optional, since it will be updated after fetching)
        };
        setMemories([newMemory, ...memories]);
    };
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // Convert FileList to an array of File objects and update the imgs
            const selectedFiles = Array.from(event.target.files);
            setFormData((prevFormData) => ({
                ...prevFormData,
                imgs: [...prevFormData.imgs, ...selectedFiles], // Updated to imgs
            }));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const fetchMemories = async () => {
        const fetchedMemories = await getMemories();
        if (fetchedMemories) {
            setMemories(fetchedMemories); // Update memories state
        }
    };

    useEffect(() => {
        fetchMemories();
    }, []);

    // Function to render base64 images
    const renderImages = (base64Images: string[]) => {
        return base64Images.map((base64, index) => (
            <img
                key={index}
                src={base64} // Use base64 string directly as src
                alt={`Memory Image ${index + 1}`}
                style={{ width: "100px", marginRight: "10px", marginTop: "10px" }}
            />
        ));
    };

    // Render the memories with base64 images
    const displayMemories = memories.map((memory) => (
        <div key={memory.id} className="memoryContainer">
            <div className="recipeTitleLink">
                <div className="recipeTitleDate">
                    <h2> {memory.title}</h2>
                    <p className="memoryDate"> {memory.date}</p>
                </div>
                {memory.link && (
                    <a href={memory.link} target="_blank" rel="noopener noreferrer">
                        <RiFilePaper2Line id="linkIcon"/> {/* Icon is now wrapped by the link */}
                    </a>
                )}
            </div>
            <p className="memoryNotes">{memory.notes}</p>
            <div className="line"></div>
            <div className="memoryImg">
                {renderImages(memory.imgs)} {/* Render base64 images */}
            </div>
        </div>
    ));

    return (
        <div className="homePage">
            <button id="newMemoryBtn" onClick={() => setNewMemForm(true)}>New Memory</button>
            <header>
                <h1> Past Deserts </h1>
                <p> 
                    I started baking more towards the end of 2024 and I wanted to 
                    keep a memory of each time I baked or made a desert*
                    (I put desert because I would mispell dessert a lot).
                    Check out what I made so far! 
                </p>
            </header>
            

            {/* Display the fetched memories */}
            <div className="allMemoriesContainer">
                {memories.length > 0 ? (
                    displayMemories // Render the memories with images
                ) : (
                    <p>No memories found</p>
                )}
            </div>

            {/* Conditionally render the new memory form */}
            {newMemForm && (
                <div className="newMemForm">
                    <h2>Add New Memory</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="inputContainer">
                            <label htmlFor="adminPass">Admin Password</label>
                            <input
                                type="text"
                                name="adminPass"
                                value={adminPass}
                                onChange={(e) =>{setAdminPass(e.target.value)}}
                                required
                                placeholder="Are you Pauleena?"
                            />
                            </div>
                        <div className="inputContainer">
                            <label htmlFor="title">Desert Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Type of Dessert"
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="notes">Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                required
                                placeholder="Any Notes?"
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="link">Link</label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                placeholder="Link to recipe"
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="date">Date</label>
                            <textarea
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                placeholder="Date Made?"
                            />
                        </div>
                        {/* Multiple Image Upload */}
                        <div>
                            <label htmlFor="imgs">Upload Images</label>
                            <input
                                type="file"
                                name="imgs"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>
                        <div>
                            <button type="submit">Save Memory</button>
                            <button type="button" onClick={() =>{setNewMemForm(false)}}>
                                Cancel
                            </button>
                        </div>
                    </form>

                    {/* Display selected images */}
                    <div>
                        <h3>Selected Images:</h3>
                        <div>
                            {formData.imgs.length > 0 &&
                                formData.imgs.map((image, index) => (
                                    <img
                                        className="formImg"
                                        key={index}
                                        src={URL.createObjectURL(image)} // Create a URL for the file to display the image
                                        alt={`Selected image ${index + 1}`}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
