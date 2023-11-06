import React, { Key, useEffect, useRef, useState } from "react";

interface ObjType {
    id: any;
    image: String;
    selected: Boolean;
}

const initialState: Array<ObjType> = [
    {
        id: 1,
        image: "/images/image-11.jpeg",
        selected: false,
    },
    {
        id: 2,
        image: "/images/image-1.webp",
        selected: false,
    },
    {
        id: 3,
        image: "/images/image-2.webp",
        selected: false,
    },
    {
        id: 4,
        image: "/images/image-3.webp",
        selected: false,
    },
    {
        id: 5,
        image: "/images/image-4.webp",
        selected: false,
    },
    {
        id: 6,
        image: "/images/image-5.webp",
        selected: false,
    },
];

function App() {
    const [images, setImages] = useState<ObjType[]>(initialState);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => {
                const newId = Date.now(); // Generate a unique ID for the new image
                return {
                    id: newId,
                    image: URL.createObjectURL(file),
                    selected: false,
                };
            });
            setImages([...images, ...newImages]);
        }
        event.target.value = ""; // Reset the input field to allow uploading the same file again
    };

    const [selectedImages, setSelectedImages] = useState<any[]>([]);

    const handleToggleSelection = (id: number) => {
        if (selectedImages.includes(id)) {
            setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
        } else {
            setSelectedImages([...selectedImages, id]);
        }
        console.log(selectedImages);
    };

    const handleDeleteSelected = () => {
        const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
        setImages(updatedImages);
        setSelectedImages([]);
        console.log(images);
    };

    const [draggedImage, setDraggedImage] = useState<number | null>(null);

    const handleDragStart = (event: React.DragEvent, id: number) => {
        event.dataTransfer.setData("imageId", id.toString());
        setDraggedImage(id);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent, id: number) => {
        event.preventDefault();
        if (draggedImage !== null) {
            const dragIndex = images.findIndex((image) => image.id === draggedImage);
            const dropIndex = images.findIndex((image) => image.id === id);
            const updatedImages = [...images];
            updatedImages.splice(dropIndex, 0, updatedImages.splice(dragIndex, 1)[0]);
            setImages(updatedImages);
            setDraggedImage(null);
        }
    };

    const Toolbar = () => (
        <div className="toolbar">
            <label className="form-grp">
                <input type="checkbox" checked={selectedImages.length ? true : false} />
                {selectedImages.length} Images selected
            </label>
            {selectedImages.length > 0 && (
                <button onClick={() => handleDeleteSelected()} className="btn">
                    Delete files
                </button>
            )}
        </div>
    );

    const Childs = () => {
        return images.map((d: ObjType, index: any) => (
            <div className="childs" key={index}>
                <label
                    htmlFor={d.image.toString()}
                    className="image-container"
                    draggable
                    onDragStart={(e) => handleDragStart(e, d.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, d.id)}
                >
                    <input
                        type="checkbox"
                        className="checkbox"
                        id={d.image.toString()}
                        onClick={() => handleToggleSelection(d.id)}
                    />
                    <img src={`${d.image}`} alt="image1" />
                </label>
            </div>
        ));
    };

    return (
        <div className="app">
            <div className="title">
                <h3>Gallery</h3>
                <hr />
            </div>

            {Toolbar()}

            <div className="container">
                {Childs()}
                <label className="childs add-more__photo" htmlFor="addImage">
                    <img src="images/image-add.svg" alt="add_more_image" />
                    <input
                        onChange={handleAddImages}
                        ref={fileInputRef}
                        type="file"
                        id="addImage"
                        accept="image/png, image/gif, image/jpeg, image/jpg"
                        style={{ opacity: 0, display: "none" }}
                    />
                    <p>Add Images</p>
                </label>
            </div>
        </div>
    );
}

export default App;
