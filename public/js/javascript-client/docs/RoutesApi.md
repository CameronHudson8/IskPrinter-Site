# EveSwaggerInterface.RoutesApi

All URIs are relative to *https://esi.tech.ccp.is*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getRouteOriginDestination**](RoutesApi.md#getRouteOriginDestination) | **GET** /v1/route/{origin}/{destination}/ | Get route


<a name="getRouteOriginDestination"></a>
# **getRouteOriginDestination**
> [&#39;Number&#39;] getRouteOriginDestination(destination, origin, opts)

Get route

Get the systems between origin and destination  ---  This route is cached for up to 86400 seconds

### Example
```javascript
var EveSwaggerInterface = require('eve_swagger_interface');

var apiInstance = new EveSwaggerInterface.RoutesApi();

var destination = 56; // Number | destination solar system ID

var origin = 56; // Number | origin solar system ID

var opts = { 
  'avoid': [3.4], // [Number] | avoid solar system ID(s)
  'connections': [new EveSwaggerInterface.[Number]()], // [[Number]] | connected solar system pairs
  'datasource': "tranquility", // String | The server name you would like data from
  'flag': "shortest", // String | route security preference
  'userAgent': "userAgent_example", // String | Client identifier, takes precedence over headers
  'xUserAgent': "xUserAgent_example" // String | Client identifier, takes precedence over User-Agent
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getRouteOriginDestination(destination, origin, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **destination** | **Number**| destination solar system ID | 
 **origin** | **Number**| origin solar system ID | 
 **avoid** | [**[Number]**](Number.md)| avoid solar system ID(s) | [optional] 
 **connections** | [**[[Number]]**]([Number].md)| connected solar system pairs | [optional] 
 **datasource** | **String**| The server name you would like data from | [optional] [default to tranquility]
 **flag** | **String**| route security preference | [optional] [default to shortest]
 **userAgent** | **String**| Client identifier, takes precedence over headers | [optional] 
 **xUserAgent** | **String**| Client identifier, takes precedence over User-Agent | [optional] 

### Return type

**[&#39;Number&#39;]**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

