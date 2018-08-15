# EveSwaggerInterface.GetCorporationsCorporationIdOrders200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**duration** | **Number** | Number of days for which order is valid (starting from the issued date). An order expires at time issued + duration | 
**escrow** | **Number** | For buy orders, the amount of ISK in escrow | [optional] 
**isBuyOrder** | **Boolean** | True if the order is a bid (buy) order | [optional] 
**issued** | **Date** | Date and time when this order was issued | 
**issuedBy** | **Number** | The character who issued this order | 
**locationId** | **Number** | ID of the location where order was placed | 
**minVolume** | **Number** | For buy orders, the minimum quantity that will be accepted in a matching sell order | [optional] 
**orderId** | **Number** | Unique order ID | 
**price** | **Number** | Cost per unit for this order | 
**range** | **String** | Valid order range, numbers are ranges in jumps | 
**regionId** | **Number** | ID of the region where order was placed | 
**typeId** | **Number** | The type ID of the item transacted in this order | 
**volumeRemain** | **Number** | Quantity of items still required or offered | 
**volumeTotal** | **Number** | Quantity of items required or offered at time order was placed | 
**walletDivision** | **Number** | The corporation wallet division used for this order. | 


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




