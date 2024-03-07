import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUnit } from 'effector-react/effector-react.mjs';
import { modelView } from 'effector-factorio';
import { mapFactory } from '../factories/mapFactory';

export const SimpleMap = modelView(mapFactory, () => {
    const factory = mapFactory.useModel();
    const mapData = useUnit(factory.$map);
    const { center, zoom, markers } = mapData;

    return (
        <div className="h-96">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                zoomControl={false}
                className="z-10 h-full"
            >
                <ZoomControl position="bottomright" />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {markers?.map((marker, index) => (
                    <Marker
                        key={index}
                        position={[
                            37.635_209_057_633_32, 55.763_310_201_892_79,
                        ]}
                    >
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
});
