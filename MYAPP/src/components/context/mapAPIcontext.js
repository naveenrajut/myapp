import createDataContext from "./createDataContext";

const mapAPIreducer = (state,action) => {
    switch(action.type)
    {
        case "autoPlaceComplete": return {placeResults: action.placeResults}
        case "getRoute": return{...state,position: action.position}
        default: return state;
    }
}

const autoPlaceComplete = (dispatch) => {
    return async(data,lat,lon) => {
        try {
            var placeResults = [];

            await fetch (`https://api.tomtom.com/search/2/search/${data.data}.json?key=clsxpIraAatvXtvvVgsGUfGDSIyMxdhG&language=en-US&lat=11.6741424&lon=78.008377&limit=5&countrySet=IN`)
            .then((res) => {
                return res.json()
            })
            .then ((data) => {
                if(data.results)
                {
                    placeResults = [];
                    for(var i = 0;i < data.results.length;i++)
                    {
                        const position = {
                            address: data.results[i].address.freeformAddress,
                            lat: data.results[i].position.lat,
                            lon: data.results[i].position.lon,
                            id: data.results[i].id
                        };
                        placeResults.push(position);
                    }
                }
            })
            .catch((err) => {console.error(err)});
            dispatch({type:"autoPlaceComplete",placeResults: placeResults});
        } catch (error) {
            console.error(error);
        }
    }
}

const getRoute = (dispatch) => {
    return async(source,destination) => {
        var position = {};
        try {
            await fetch(`https://api.tomtom.com/routing/1/calculateRoute/${source.lat}%2C${source.lon}%3A${destination.lat}%2C${destination.lon}/json?computeBestOrder=true&computeTravelTimeFor=all&avoid=unpavedRoads&travelMode=bus&key=clsxpIraAatvXtvvVgsGUfGDSIyMxdhG`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {position=data})
            .catch((err) => {console.error(err)});
            dispatch({type:"getRoute",position:position});
        } catch (error) {
         console.log(error);   
        }
    }
}

export const {Provider,Context} = createDataContext(
    mapAPIreducer,
    {autoPlaceComplete,getRoute},
    {whereFrom:"",whereTo:"",placeResults:[],position:{}}
);