import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { motion, AnimatePresence } from "framer-motion";

// const DraggableLetter = ({ letter, index, onStop }) => {
//   const nodeRef = React.useRef(null); 

//   return (
//     <Draggable nodeRef={nodeRef} axis="x" onStop={onStop}>
//       <div
//         ref={nodeRef} 
//         className="d-inline-block m-2 p-2 border border-dark rounded shadow-sm"
//         style={{ fontSize: "1.5rem", cursor: "move" }}
//       >
//         {letter}
//       </div>
//     </Draggable>
//   );
// };

// const Popup = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -100 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -100 }}
//       className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
//     >
//       <motion.div className="bg-white p-6 rounded shadow-lg">
//         Congratulations! You've arranged 'Monty Python'.
//       </motion.div>
//     </motion.div>
//   );
// };

const HomePage = () => {
  const headerRef = React.useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("#f5f5f5");
  const [arrangement, setArrangement] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const text = "nth tyPonoMy";
  const [order, setOrder] = useState(text.split(''));

  const backgrounds = ['#574052', '#8DC6BF', '#FCBC65', '#FA7B50'];
  const largeNums = [30, 35, 40, 50]; 
  const smallNums = [3, 4, 5, 6];
  const [coordinates, setCoordinates] = useState({ x: undefined, y: undefined });
  const [elements, setElements] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const generateNumber = () => { 
    return Math.floor(Math.random() * 4);
  }

  const createRandomNumbers = () => {
    return [generateNumber(), generateNumber(), generateNumber()];
  }

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
    if(coordinates.x === undefined || coordinates.y === undefined){
      setCoordinates({ x: e.x, y: e.y });
      addElement(e.x, e.y);
    }

    if(Math.abs(coordinates.x - e.x) > 50 || Math.abs(coordinates.y - e.y) > 50) {
      setCoordinates({ x: e.x, y: e.y });
      addElement(e.x, e.y);
    } 
  }

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    const handleMouseMove = e => {
      if (isMouseDown) {
        updateCoordinates(e);
      }
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

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
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); 
    }
  }, [order]);

  const handleStop = (letter, index) => (e, data) => {
  const newOrder = [...order];
  const moveIndex = newOrder.findIndex(item => item === letter);
  const allPositions = newOrder.map((item, idx) => ({
    letter: item,
    position: (arrangement[item + idx] || 0) + idx * 40  // assuming each letter takes up about 40px
  }));
  const sortedPositions = allPositions.sort((a, b) => a.position - b.position);
  const targetIndex = sortedPositions.findIndex(item => item.letter === letter);
  
  if (moveIndex !== targetIndex) {
    newOrder.splice(moveIndex, 1);  // remove the letter from its original position
    newOrder.splice(targetIndex, 0, letter);  // insert it into its new position
    setOrder(newOrder);
  }
};

return (
  <div className="bg-light py-5" style={{ minHeight: "200vh", backgroundColor: backgroundColor }}>
    <header ref={headerRef}>
      <h1 className="font-weight-bold display-4">HEY, I'M ARTUR SHIROKOV</h1>
      {elements.map((ele, index) => (
        <div 
          key={index} 
          style={{ 
            left: ele.x, 
            top: ele.y,
            width: ele.type === 'wide' ? largeNums[ele.style[0]] : smallNums[ele.style[0]],
            height: ele.type === 'wide' ? smallNums[ele.style[1]] : largeNums[ele.style[1]],
            backgroundColor: backgrounds[ele.style[2]],
            position: 'absolute'
          }} 
          className={`line ${ele.type === 'wide' ? 'line-wide' : 'line-high'}`}
        />
      ))}
    </header>
    <div className="container mt-5">
      <p className="lead" style={{ fontSize: "1.3rem", textAlign: "center" }}>
        I'm an aspiring developer who speaks to snakes and writes in the script of an Indonesian island.
      </p>
    </div>
  </div>
);
};

export default HomePage;
