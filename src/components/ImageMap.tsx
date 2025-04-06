import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import mapAreas from '../data/mapAreas';
import arkhemMap from '../img/arkhemMap.jpg';

type Tooltip = {
    visible: boolean;
    text: string;
    x: number;
    y: number;
};

type MapArea = {
    coord: string;
    name: string;
    id: string;
};

const ImageMap: React.FC = () => {
    const [tooltip, setTooltip] = useState<Tooltip>({ visible: false, text: '', x: 0, y: 0 });
    const imgRef = useRef<HTMLImageElement | null>(null);

    // updateCoords: пересчитывает координаты областей карты при масштабировании
    const updateCoords = () => {
        if (!imgRef.current) return;

        const originalWidth = 3520;
        const currentWidth = imgRef.current.offsetWidth;
        const scale = currentWidth / originalWidth;

        const areas = document.querySelectorAll<HTMLAreaElement>('area');
        areas.forEach(area => {
            const originalCoords = area.getAttribute('data-original-coords');
            if (originalCoords) {
                const coordsArray = originalCoords.split(',').map(Number);
                const scaledCoords = coordsArray.map(coord => Math.round(coord * scale));
                area.coords = scaledCoords.join(',');
            }
        });
    };

    useEffect(() => {
        window.addEventListener('resize', updateCoords);
        updateCoords();
        return () => window.removeEventListener('resize', updateCoords);
    }, []);

    const handleAreaClick = (
        key: string,
        object: MapArea,
        event: MouseEvent<HTMLAreaElement>
    ) => {
        const rect = imgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setTooltip({ visible: true, x, y, text: `${key} - ${object.name}` });
    };

    function isPointInPolygon(polygon: number[], x: number, y: number): boolean {
        let inside = false;
        for (let i = 0, j = polygon.length - 2; i < polygon.length; i += 2) {
            const xi = polygon[i], yi = polygon[i + 1];
            const xj = polygon[j], yj = polygon[j + 1];

            const intersect =
                yi > y !== yj > y &&
                x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

            if (intersect) inside = !inside;
            j = i;
        }
        return inside;
    }

    const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
        const rect = imgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const areas = document.querySelectorAll<HTMLAreaElement>('area');

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

    return (
        <div className="container">
            <div className="pyramid">
                <img
                    ref={imgRef}
                    src={arkhemMap}
                    useMap="#Map"
                    alt="Pyramid"
                    onLoad={updateCoords}
                    onClick={handleImageClick}
                />
                <map name="Map" id="Map">
                    {Object.entries(mapAreas).map(([key, object]) => (
                        <area
                            alt={`Brick ${object.id}`}
                            onClick={(event) => handleAreaClick(key, object as MapArea, event)}
                            shape="poly"
                            coords={object.coord}
                            data-original-coords={object.coord}
                            key={key}
                        />
                    ))}
                    {/* tooltip рендерим вне map */}
                </map>
                {tooltip.visible && (
                    <div className="tooltip" style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}>
                        {tooltip.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageMap;
