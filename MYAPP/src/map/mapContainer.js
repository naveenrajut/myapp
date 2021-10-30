import React,{useRef,useState,useEffect} from "react";
//import "@tomtom-international/web-sdk-maps/dist/index";
import * as tt from "@tomtom-international/web-sdk-maps";

const Map = () => {
    const [mapLon,setMapLon] = useState("11.6741424");
    const [mapLat,setMapLat] = useState("78.008377");
    const [map,setMap] = useState({});

    const mapElement = useRef();
    useEffect( () => {
        let map = tt.map({
                            key:APIKEY,
                            container:mapElement.current,
                            center:[mapLon,mapLat]
                        });
        setMap(map);
        return () => map.remove();
    },[]);
    return(
        <div ref={mapElement} className="mapDiv"></div>
    );
}

export default Map;