import { useEffect, useState } from "react";
import { addMemory, getMemories } from "../firebase/firebaseUtils";

export const Home = () => {
    const [newMemForm, setNewMemForm] = useState<boolean>(false);
    
    // Group all fields into a single state object
    const [formData, setFormData] = useState({
        title: "",
        notes: "",
        link: "",
        imgs: [] as File[], // State to store multiple images
    });

    const [memories, setMemories] = useState<{
        id: string;
        title: string;
        notes: string;
        link: string;
        imgs: string[]; // Base64 strings
    }[]>([]);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { title, notes, link, imgs } = formData;

        addMemory(title, notes, link, imgs);

        setNewMemForm(false);
        setFormData({ title: "", notes: "", link: "", imgs: [] });
        // Optionally, update the UI immediately by adding the new memory
        const newMemory = {
            title,
            notes,
            link,
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
        <div key={memory.id}>
            <h2>{memory.title}</h2>
            <p>{memory.notes}</p>
            {memory.link && (
                <a href={memory.link} target="_blank" rel="noopener noreferrer">
                    {memory.link}
                </a>
            )}
            <div>
                {renderImages(memory.imgs)} {/* Render base64 images */}
            </div>
        </div>
    ));

    return (
        <>
            <button onClick={() => setNewMemForm(true)}>New Memory</button>
            <h1>Past Deserts</h1>
            <p>All recipes here</p>

            {/* Conditionally render the new memory form */}
            {newMemForm && (
                <div>
                    <h2>Add New Memory</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="title">Desert Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="notes">Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="link">Link</label>
                            <input
                                type="url"
                                id="link"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Multiple Image Upload */}
                        <div>
                            <label htmlFor="imgs">Upload Images</label>
                            <input
                                type="file"
                                id="imgs"
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
                                        key={index}
                                        src={URL.createObjectURL(image)} // Create a URL for the file to display the image
                                        alt={`Selected image ${index + 1}`}
                                        style={{
                                            width: "100px",
                                            marginRight: "10px",
                                            marginTop: "10px",
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Display the fetched memories */}
            <div>
                {memories.length > 0 ? (
                    displayMemories // Render the memories with images
                ) : (
                    <p>No memories found. Add some to get started!</p>
                )}
            </div>
        </>
    );
};
