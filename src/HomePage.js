import React, { useState, useEffect, useRef } from "react";

const HomePage = () => {
    const headerRef = React.useRef(null);
    const [arrangement, setArrangement] = useState({});
    const [order, setOrder] = useState("nth tyPonoMy".split(''));
    const [coordinates, setCoordinates] = useState({ x: undefined, y: undefined });
    const [elements, setElements] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const backgrounds = ['#574052', '#8DC6BF', '#FCBC65', '#FA7B50'];
    const largeNums = [30, 35, 40, 50];
    const smallNums = [3, 4, 5, 6];

    const generateNumber = () => Math.floor(Math.random() * 4);
    const createRandomNumbers = () => [generateNumber(), generateNumber(), generateNumber()];

    const addElement = (x, y) => {
        const newEle = {
            x,
            y,
            type: Math.round(Math.random()) === 0 ? 'wide' : 'tall',
            style: createRandomNumbers(),
        };
        setElements(prevElements => [...prevElements, newEle]);
    };

    const updateCoordinates = e => {
        if (!coordinates.x || !coordinates.y) {
            setCoordinates({ x: e.x, y: e.y });
            addElement(e.x, e.y);
        }
        if (Math.abs(coordinates.x - e.x) > 50 || Math.abs(coordinates.y - e.y) > 50) {
            setCoordinates({ x: e.x, y: e.y });
            addElement(e.x, e.y);
        }
    };

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const handleMouseMove = e => isMouseDown && updateCoordinates(e);
        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        header.addEventListener('mousemove', handleMouseMove);
        header.addEventListener('mousedown', handleMouseDown);
        header.addEventListener('mouseup', handleMouseUp);

        return () => {
            header.removeEventListener('mousemove', handleMouseMove);
            header.removeEventListener('mousedown', handleMouseDown);
            header.removeEventListener('mouseup', handleMouseUp);
        };
    }, [coordinates, isMouseDown]);

    useEffect(() => {
        if (order.join('') === "Monty Python") {
            // Handle logic if needed when order matches "Monty Python"
        }
    }, [order]);

    return (
        <div className="bg-light py-5 main-wrapper">
            <div className="home" ref={headerRef}>
                <h1 className="font-weight-bold display-4">HEY, I'M ARTUR SHIROKOV</h1>
                <p className="lead">I'm an aspiring developer who speaks to snakes and writes in the script of an Indonesian island.</p>
                {elements.map((ele, index) => (
                    <div
                        key={index}
                        style={{
                            left: ele.x,
                            top: ele.y,
                            width: ele.type === 'wide' ? largeNums[ele.style[0]] : smallNums[ele.style[0]],
                            height: ele.type === 'wide' ? smallNums[ele.style[1]] : largeNums[ele.style[1]],
                            backgroundColor: backgrounds[ele.style[2]],
                        }}
                        className={`line ${ele.type === 'wide' ? 'line-wide' : 'line-high'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
