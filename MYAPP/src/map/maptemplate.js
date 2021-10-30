import React,{useContext} from 'react';
import { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import mapTemplate from './index';
//import mapComplete from "./placeComplete"
import { Context as MapContext } from '../components/context/mapAPIcontext'; 
const Map = () => {
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState('-121.913, 37.361');
  const {state:{position}} = useContext(MapContext);
  
  const mapLayer = `
  map.addLayer({
    'id': 'route',
    'type': 'fill',
    'source': {
        'type': 'json',
        'data': ${position}
    },
    'layout': {},
    'paint': {
        'fill-color': '#db356c',
        'fill-opacity': 0.5,
        'fill-outline-color': 'black'
    }
});
  `;
  
/*  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;

  const onMessage = (payload) => {
  let dataPayload;
  try {
    dataPayload = JSON.parse(payload.nativeEvent.data);
  } catch (e) {console.error(e)}

  if (dataPayload) {
    if (dataPayload.type === 'Console') {
      console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
    } else {
      console.log('ELSE ',dataPayload)
    }
  }
};*/
  return (
    <View style={styles.container}>
      <WebView
        ref={(r) => (webRef = r)}
        //onMessage={onMessage}
        style={styles.map}
        originWhitelist={['*']}
        source={{html: mapTemplate}}
        javaScriptEnabled={true}
        injectedJavaScript={mapLayer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    height: '15%',
    backgroundColor: '#fff',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  textInput: {
    height: 40,
    width: "60%",
    marginRight: 12,
    paddingLeft: 5,
    borderWidth: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContaire: {
    width: "90%",
    height: "30%",
    alignItems: "center",
    justifyContent:"center"
  }
});

export default Map;