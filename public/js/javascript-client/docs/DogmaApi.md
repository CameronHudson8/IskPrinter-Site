# EveSwaggerInterface.DogmaApi

All URIs are relative to *https://esi.evetech.net*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getDogmaAttributes**](DogmaApi.md#getDogmaAttributes) | **GET** /v1/dogma/attributes/ | Get attributes
[**getDogmaAttributesAttributeId**](DogmaApi.md#getDogmaAttributesAttributeId) | **GET** /v1/dogma/attributes/{attribute_id}/ | Get attribute information
[**getDogmaDynamicItemsTypeIdItemId**](DogmaApi.md#getDogmaDynamicItemsTypeIdItemId) | **GET** /v1/dogma/dynamic/items/{type_id}/{item_id}/ | Get dynamic item information
[**getDogmaEffects**](DogmaApi.md#getDogmaEffects) | **GET** /v1/dogma/effects/ | Get effects
[**getDogmaEffectsEffectId**](DogmaApi.md#getDogmaEffectsEffectId) | **GET** /v2/dogma/effects/{effect_id}/ | Get effect information


<a name="getDogmaAttributes"></a>
# **getDogmaAttributes**
> [&#39;Number&#39;] getDogmaAttributes(opts)

Get attributes

Get a list of dogma attribute ids  ---  This route expires daily at 11:05

### Example
```javascript
var EveSwaggerInterface = require('eve_swagger_interface');

var apiInstance = new EveSwaggerInterface.DogmaApi();

var opts = { 
  'datasource': "tranquility", // String | The server name you would like data from
  'ifNoneMatch': "ifNoneMatch_example", // String | ETag from a previous request. A 304 will be returned if this matches the current ETag
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getDogmaAttributes(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **datasource** | **String**| The server name you would like data from | [optional] [default to tranquility]
 **ifNoneMatch** | **String**| ETag from a previous request. A 304 will be returned if this matches the current ETag | [optional] 

### Return type

**[&#39;Number&#39;]**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getDogmaAttributesAttributeId"></a>
# **getDogmaAttributesAttributeId**
> GetDogmaAttributesAttributeIdOk getDogmaAttributesAttributeId(attributeId, opts)

Get attribute information

Get information on a dogma attribute  ---  This route expires daily at 11:05

### Example
```javascript
var EveSwaggerInterface = require('eve_swagger_interface');

var apiInstance = new EveSwaggerInterface.DogmaApi();

var attributeId = 56; // Number | A dogma attribute ID

var opts = { 
  'datasource': "tranquility", // String | The server name you would like data from
  'ifNoneMatch': "ifNoneMatch_example", // String | ETag from a previous request. A 304 will be returned if this matches the current ETag
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getDogmaAttributesAttributeId(attributeId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **attributeId** | **Number**| A dogma attribute ID | 
 **datasource** | **String**| The server name you would like data from | [optional] [default to tranquility]
 **ifNoneMatch** | **String**| ETag from a previous request. A 304 will be returned if this matches the current ETag | [optional] 

### Return type

[**GetDogmaAttributesAttributeIdOk**](GetDogmaAttributesAttributeIdOk.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getDogmaDynamicItemsTypeIdItemId"></a>
# **getDogmaDynamicItemsTypeIdItemId**
> GetDogmaDynamicItemsTypeIdItemIdOk getDogmaDynamicItemsTypeIdItemId(itemId, typeId, opts)

Get dynamic item information

Returns info about a dynamic item resulting from mutation with a mutaplasmid.  ---  This route expires daily at 11:05

### Example
```javascript
var EveSwaggerInterface = require('eve_swagger_interface');

var apiInstance = new EveSwaggerInterface.DogmaApi();

var itemId = 789; // Number | item_id integer

var typeId = 56; // Number | type_id integer

var opts = { 
  'datasource': "tranquility", // String | The server name you would like data from
  'ifNoneMatch': "ifNoneMatch_example", // String | ETag from a previous request. A 304 will be returned if this matches the current ETag
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getDogmaDynamicItemsTypeIdItemId(itemId, typeId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **itemId** | **Number**| item_id integer | 
 **typeId** | **Number**| type_id integer | 
 **datasource** | **String**| The server name you would like data from | [optional] [default to tranquility]
 **ifNoneMatch** | **String**| ETag from a previous request. A 304 will be returned if this matches the current ETag | [optional] 

### Return type

[**GetDogmaDynamicItemsTypeIdItemIdOk**](GetDogmaDynamicItemsTypeIdItemIdOk.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getDogmaEffects"></a>
# **getDogmaEffects**
> [&#39;Number&#39;] getDogmaEffects(opts)

Get effects

Get a list of dogma effect ids  ---  This route expires daily at 11:05

### Example
```javascript
var EveSwaggerInterface = require('eve_swagger_interface');

var apiInstance = new EveSwaggerInterface.DogmaApi();

var opts = { 
  'datasource': "tranquility", // String | The server name you would like data from
  'ifNoneMatch': "ifNoneMatch_example", // String | ETag from a previous request. A 304 will be returned if this matches the current ETag
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getDogmaEffects(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **datasource** | **String**| The server name you would like data from | [optional] [default to tranquility]
 **ifNoneMatch** | **String**| ETag from a previous request. A 304 will be returned if this matches the current ETag | [optional] 

### Return type

**[&#39;Number&#39;]**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getDogmaEffectsEffectId"></a>
# **getDogmaEffectsEffectId**
> GetDogmaEffectsEffectIdOk getDogmaEffectsEffectId(effectId, opts)

Get effect information

Get information on a dogma effect  ---  This route expires daily at 11:05

### Example
```javascript
var EveSwaggerInterface = require('eve_swagger_interface');

var apiInstance = new EveSwaggerInterface.DogmaApi();

var effectId = 56; // Number | A dogma effect ID

var opts = { 
  'datasource': "tranquility", // String | The server name you would like data from
  'ifNoneMatch': "ifNoneMatch_example", // String | ETag from a previous request. A 304 will be returned if this matches the current ETag
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getDogmaEffectsEffectId(effectId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **effectId** | **Number**| A dogma effect ID | 
 **datasource** | **String**| The server name you would like data from | [optional] [default to tranquility]
 **ifNoneMatch** | **String**| ETag from a previous request. A 304 will be returned if this matches the current ETag | [optional] 

### Return type

[**GetDogmaEffectsEffectIdOk**](GetDogmaEffectsEffectIdOk.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

