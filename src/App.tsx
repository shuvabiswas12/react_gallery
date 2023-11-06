import React, { Key, useState } from "react";

interface ObjType {
    id: Key;
    image: String;
    selected: Boolean;
}

const initialState: Array<ObjType> = [
    {
        id: 1,
        image: "image-11.jpeg",
        selected: false,
    },
    {
        id: 2,
        image: "image-1.webp",
        selected: false,
    },
    {
        id: 3,
        image: "image-2.webp",
        selected: false,
    },
    {
        id: 4,
        image: "image-3.webp",
        selected: false,
    },
    {
        id: 5,
        image: "image-4.webp",
        selected: false,
    },
    {
        id: 6,
        image: "image-5.webp",
        selected: false,
    },
];

function App() {
    const [images, setImages] = useState<ObjType[]>(initialState);

    const Toolbar = () => (
        <div className="toolbar">
            <div className="form-grp">
                <input type="checkbox" />
                <span>3 Files selected</span>
            </div>
            <button className="btn">Delete files</button>
        </div>
    );

    const Childs = () => {
        return images.map((d: ObjType) => (
            <div className="childs" key={d.id}>
                <label htmlFor={d.image.toString()} className="image-container">
                    <input type="checkbox" className="checkbox" id={d.image.toString()} />
                    <img src={`images/${d.image}`} alt="image1" />
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
                <div className="childs add-more__photo">
                    <img src="images/image-add.svg" alt="add_more_image" />
                    <p>Add Images</p>
                </div>
            </div>
        </div>
    );
}

export default App;
