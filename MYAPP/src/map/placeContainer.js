import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import mapTemplate from './index';
import mapComplete from "./placeComplete"

const Place = () => {
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState('-121.913, 37.361');
  
  
  const debugging = `
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
};
  return (
    <View style={styles.container}>
      <WebView
        ref={(r) => (webRef = r)}
        onMessage={onMessage}
        originWhitelist={['*']}
        style={styles.searchContaire}
        source={{html: mapComplete}}
        javaScriptEnabled={true}
        injectedJavaScript={debugging}
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

[{"address": {
    "country": "India", 
    "countryCode": "IN", 
    "countryCodeISO3": "IND", 
    "countrySecondarySubdivision": "Bengaluru", 
    "countrySubdivision": "Karnataka", "freeformAddress": "Whitefield 66, Bengaluru, Karnataka", "municipality": "Bengaluru", "municipalitySubdivision": "Whitefield 66"}, "boundingBox": {"btmRightPoint": [Object], "topLeftPoint": [Object]}, "dataSources": {"geometry": [Object]}, "dist": 149288.45047174135, "entityType": "MunicipalitySubdivision", "id": "IN/GEO/p0/152070", "position": {"lat": 12.99435, "lon": 77.75852}, "score": 2.166009903, "type": "Geography", "viewport": {"btmRightPoint": [Object], "topLeftPoint": [Object]}}, {"address": {"country": "India", "countryCode": "IN", "countryCodeISO3": "IND", "countrySecondarySubdivision": "Bengaluru", "countrySubdivision": "Karnataka", "freeformAddress": "Hoodi Main Road, Near Indian Oil Petroleum, Seetharampalya Whitefield, Industrial Estate Dodda Nekkundi, Bengaluru 560048, Karnataka", "localName": "Bengaluru", "municipality": "Bengaluru", "municipalitySubdivision": "Industrial Estate Dodda Nekkundi", "postalCode": "560048", "streetName": "Hoodi Main Road, Near Indian Oil Petroleum, Seetharampalya Whitefield"}, "dist": 149126.26395308992, "entryPoints": [[Object]], "id": "g6JpZK8zNTYwMDkwMzY4MzYzNTChY6NJTkShdqJJTg==", "info": "search:ta:356009036836350-IN", "poi": {"categories": [Array], "categorySet": [Array], "classifications": [Array], "name": "Whitefield Lake"}, "position": {"lat": 12.98374, "lon": 77.71247}, "score": 2.1195287704, "type": "POI", "viewport": {"btmRightPoint": [Object], "topLeftPoint": [Object]}}, {"address": {"country": "India", "countryCode": "IN", "countryCodeISO3": "IND", "countrySecondarySubdivision": "Bengaluru", "countrySubdivision": "Karnataka", "freeformAddress": "Whitefield Road, Prestige Ozone, Bengaluru 560066, Karnataka", "localName": "Bengaluru", "municipality": "Bengaluru", "municipalitySubdivision": "Prestige Ozone", "postalCode": "560066", "streetName": "Whitefield Road"}, "dist": 145679.7341798832, "id": "IN/STR/p0/1223602", "position": {"lat": 12.95906, "lon": 77.74657}, "score": 2.0809679031, "type": "Street", "viewport": {"btmRightPoint": [Object], "topLeftPoint": [Object]}}, {"address": {"country": "India", "countryCode": "IN", "countryCodeISO3": "IND", "countrySecondarySubdivision": "Bengaluru", "countrySubdivision": "Karnataka", "freeformAddress": "Whitefield Road, Indira Nagar Layout, Bengaluru 560016, Karnataka", "localName": "Bengaluru", "municipality": "Bengaluru", "municipalitySubdivision": "Indira Nagar Layout", "postalCode": "560016", "streetName": "Whitefield Road"}, "dist": 151670.64730551824, "id": "IN/STR/p0/422526", "position": {"lat": 13.00018, "lon": 77.68123}, "score": 2.0804820061, "type": "Street", "viewport": {"btmRightPoint": [Object], "topLeftPoint": [Object]}}, {"address": {"country": "India", "countryCode": "IN", "countryCodeISO3": "IND", "countrySecondarySubdivision": "Bengaluru", "countrySubdivision": "Karnataka", "freeformAddress": "Whitefield Main Road, Narayanappa Garden, Bengaluru 560066, Karnataka", "localName": "Bengaluru", "municipality": "Bengaluru", "municipalitySubdivision": "Narayanappa Garden", "postalCode": "560066", "streetName": "Whitefield Main Road"}, "dist": 146332.0752587371, "id": "IN/STR/p0/468349", "position": {"lat": 12.96581, "lon": 77.75057}, "score": 2.0607097149, "type": "Street", "viewport": {"btmRightPoint": [Object], "topLeftPoint": [Object]}}]

export default Place;