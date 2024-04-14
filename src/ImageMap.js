import React, { useState, useEffect, useRef } from 'react';
import mapAreas from './resourse/mapAreas'
import arkhemMap from './img/arkhemMap.jpg'

const ImageMap = () => {
    const [selectedBrick, setSelectedBrick] = useState('');
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
    const imgRef = useRef(null);  // Reference to the image element
    const [highlightedArea, setHighlightedArea] = useState(null);


    useEffect(() => {
        window.addEventListener('resize', updateCoords);
        updateCoords(); // Call to update coordinates on mount
        return () => {
            window.removeEventListener('resize', updateCoords);
        };
    }, []);

    const updateCoords = () => {
        if (!imgRef.current) {
            return;
        }

        const originalWidth = 3520;//1360;  // Replace with the original width of your image
        const currentWidth = imgRef.current.offsetWidth;  // Current width of the image
        const scale = currentWidth / originalWidth;  // Scaling factor

        const areas = document.querySelectorAll('area');
        areas.forEach(area => {
            const originalCoords = area.getAttribute('data-original-coords');
            if (originalCoords) {
                const coordsArray = originalCoords.split(',').map(Number);
                const scaledCoords = coordsArray.map(coord => Math.round(coord * scale));
                area.coords = scaledCoords.join(',');
            }
        });
    };

    const handleAreaClick = (key, object, event) => {
        setSelectedBrick(`brick ${key}`);
        const rect = imgRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left; // x position within the image
        const y = event.clientY - rect.top;  // y position within the image

        setTooltip({ visible: true, x, y, text: `${key} - ${object.name}` });
    };
    

    return (
        <div className="container">
            <div className="pyramid">
            
                <img ref={imgRef} src={arkhemMap}
                     useMap="#Map" alt="Pyramid" />

                {/* <img ref={imgRef} src="https://res.cloudinary.com/positionrelativ/image/upload/v1492379605/pyramid_1_fu4idd.png"
                     useMap="#Map" alt="Pyramid" /> */}

                <map name="Map" id="Map">
                    {/* Make sure to include the `data-original-coords` attribute for each area */}
                    {Object.entries(mapAreas).map(([key, object]) => (
                        <area alt={`Brick ${object.id}`} onClick={(event) => handleAreaClick(key, object, event)} shape="poly" 
                            coords={object.coord} data-original-coords={object.coord} key={key}/>
                    ))}

                    {tooltip.visible && (
                        <div className="tooltip" style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}>
                            {tooltip.text}
                        </div>
                    )}                    
                </map>
            </div>
            {/* <div className="selection">
                <p>{selectedBrick || 'click a brick'}</p>
            </div> */}
        </div>
    );
}

export default ImageMap;