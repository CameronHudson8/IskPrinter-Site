# EveSwaggerInterface.GetCharactersCharacterIdOrders200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**orderId** | **Number** | Unique order ID | 
**typeId** | **Number** | The type ID of the item transacted in this order | 
**regionId** | **Number** | ID of the region where order was placed | 
**locationId** | **Number** | ID of the location where order was placed | 
**range** | **String** | Valid order range, numbers are ranges in jumps | 
**price** | **Number** | Cost per unit for this order | 
**volumeTotal** | **Number** | Quantity of items required or offered at time order was placed | 
**volumeRemain** | **Number** | Quantity of items still required or offered | 
**issued** | **Date** | Date and time when this order was issued | 
**isBuyOrder** | **Boolean** | True if the order is a bid (buy) order | [optional] 
**minVolume** | **Number** | For buy orders, the minimum quantity that will be accepted in a matching sell order | [optional] 
**escrow** | **Number** | For buy orders, the amount of ISK in escrow | [optional] 
**duration** | **Number** | Number of days for which order is valid (starting from the issued date). An order expires at time issued + duration | 
**isCorporation** | **Boolean** | Signifies whether the buy/sell order was placed on behalf of a corporation. | 


<a name="RangeEnum"></a>
## Enum: RangeEnum


* `1` (value: `"1"`)

* `10` (value: `"10"`)

* `2` (value: `"2"`)

* `20` (value: `"20"`)

* `3` (value: `"3"`)

* `30` (value: `"30"`)

* `4` (value: `"4"`)

* `40` (value: `"40"`)

* `5` (value: `"5"`)

* `region` (value: `"region"`)

* `solarsystem` (value: `"solarsystem"`)

* `station` (value: `"station"`)




