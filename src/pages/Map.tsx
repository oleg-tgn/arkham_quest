import { FC } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import arkhemMap from '/img/map.jpg';
import { useGameStore } from '../store/useGameStore';

{
  /* Опционально: кнопки управления */
}
{
  /* <div className="flex gap-2 p-2">
    <button onClick={() => zoomIn()} className={buttonClassName}>+</button>
    <button onClick={() => zoomOut()} className={buttonClassName}>-</button>
    <button onClick={() => resetTransform()} className={buttonClassName}>Reset</button>
  </div> */
}

export const Map: FC = () => {
  // const buttonClassName =
  //   'px-4 py-2 bg-[#8b5e3c] hover:bg-[#6b3f22] text-white text-sm font-bold rounded shadow whitespace-nowrap';

  const { mapTransform, setMapTransform } = useGameStore();
  const initialTransform = mapTransform;

  return (
    <div className="arkhem-content h-[calc(100vh-125px)]">
      <TransformWrapper
        initialScale={initialTransform.scale}
        initialPositionX={initialTransform.positionX}
        initialPositionY={initialTransform.positionY}
        minScale={0.1}
        maxScale={3}
        wheel={{ step: 0.05 }}
        doubleClick={{ disabled: true }} // по желанию
        pinch={{ step: 5 }}
        panning={{ velocityDisabled: true }}
        onTransformed={ref => {
          setMapTransform({
            scale: ref.state.scale,
            positionX: ref.state.positionX,
            positionY: ref.state.positionY,
          });
        }}
      >
        <TransformComponent
          wrapperStyle={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            touchAction: 'none',
          }}
          contentStyle={{
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          <img
            src={arkhemMap}
            alt="Map"
            draggable={false}
            className="block max-w-none select-none"
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
