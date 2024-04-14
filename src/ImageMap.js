import React, { useState, useEffect, useRef } from 'react';
import mapAreas from './resourse/mapAreas'
import arkhemMap from './img/arkhemMap.jpg'

const ImageMap = () => {
    const [selectedBrick, setSelectedBrick] = useState('');
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
    const imgRef = useRef(null);  // Reference to the image element


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

    function isPointInPolygon(polygon, x, y) {
        let inside = false;
        for (let i = 0, j = polygon.length - 2; i < polygon.length; i += 2) {
            let xi = polygon[i], yi = polygon[i + 1];
            let xj = polygon[j], yj = polygon[j + 1];
    
            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
            j = i;
        }
        return inside;
    }

    const handleImageClick = event => {
        const rect = imgRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const areas = document.querySelectorAll('area');
        let isAreaClicked = false;

        areas.forEach(area => {
            const coords = area.coords.split(',').map(Number);
            if (isPointInPolygon(coords, x, y)) {
                isAreaClicked = true;
            }
        });

        if (!isAreaClicked) {
            setTooltip(prev => ({ ...prev, visible: false }));
        }
    };

    const handleImageLoaded = () => {
        updateCoords();  // This will now be called when the image is fully loaded
    };    

    return (
        <div className="container">
            <div className="pyramid">
            
                <img ref={imgRef} src={arkhemMap}
                    useMap="#Map" alt="Pyramid"
                    onLoad={handleImageLoaded} 
                    onClick={handleImageClick}/>

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