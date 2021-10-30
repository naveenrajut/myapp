export default `
<div>
    <style>
            html, body {
                margin: 0;
            }
    </style>
    <!-- load TomTom Maps Web SDK from CDN -->
    <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.3-public-preview.0/SearchBox.css'/>

    <script src="https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.3-public-preview.0/SearchBox-web.js"></script>
    <script src="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.1.2-public-preview.15/services/services-web.min.js"></script>

    <script>
        var options = {
            searchOptions: {
                key: APIKEY,
                language: 'en-GB',
                limit: 5,
            },
            autocompleteOptions: {
                key: APIKEY,
                language: 'en-GB'
            }
        };
       
        var ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
        var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
        document.body.append(searchBoxHTML);
        var ttSearchBox1 = new tt.plugins.SearchBox(tt.services, options);
        var searchBoxHTML1 = ttSearchBox1.getSearchBoxHTML();
        document.body.append(searchBoxHTML1);
        ttSearchBox.setAttribute('style','background: red;')
        ttSearchBox.on('tomtom.searchbox.resultselected', event=>{
            window.ReactNativeWebView.postMessage(JSON.stringify(event)) }
            )
        ttSearchBox1.on('tomtom.searchbox.resultselected', event=>{
            window.ReactNativeWebView.postMessage(JSON.stringify(event)) }
            )
    </script>
</div>
`;