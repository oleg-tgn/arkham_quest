import React, { useState, useEffect, useRef } from 'react';
import mapAreas from './resourse/mapAreas'

const ImageMap = () => {
    const [selectedBrick, setSelectedBrick] = useState('');
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

        const originalWidth = 1360;  // Replace with the original width of your image
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

    const handleAreaClick = (brick) => {
        setSelectedBrick(`brick ${brick}`);
    };

    return (
        <div className="container">
            <div className="pyramid">
                <img ref={imgRef} src="https://res.cloudinary.com/positionrelativ/image/upload/v1492379605/pyramid_1_fu4idd.png"
                     useMap="#Map" alt="Pyramid" />

                <map name="Map" id="Map">
                    {/* Make sure to include the `data-original-coords` attribute for each area */}
                    {mapAreas.map(function(object, i) {
                         return <area alt="Brick {object.id}" onClick={() => handleAreaClick(object.id)} shape="poly" 
                            coords={object.coord} data-original-coords={object.coord} />;                       
                    })}
                </map>
            </div>
            <div className="selection">
                <p>{selectedBrick || 'click a brick'}</p>
            </div>
        </div>
    );
}

export default ImageMap;
