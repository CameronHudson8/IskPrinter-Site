# EveSwaggerInterface.GetCorporationsCorporationIdContracts200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**contractId** | **Number** | contract_id integer | 
**issuerId** | **Number** | Character ID for the issuer | 
**issuerCorporationId** | **Number** | Character&#39;s corporation ID for the issuer | 
**assigneeId** | **Number** | ID to whom the contract is assigned, can be corporation or character ID | 
**acceptorId** | **Number** | Who will accept the contract | 
**startLocationId** | **Number** | Start location ID (for Couriers contract) | [optional] 
**endLocationId** | **Number** | End location ID (for Couriers contract) | [optional] 
**type** | **String** | Type of the contract | 
**status** | **String** | Status of the the contract | 
**title** | **String** | Title of the contract | [optional] 
**forCorporation** | **Boolean** | true if the contract was issued on behalf of the issuer&#39;s corporation | 
**availability** | **String** | To whom the contract is available | 
**dateIssued** | **Date** | Сreation date of the contract | 
**dateExpired** | **Date** | Expiration date of the contract | 
**dateAccepted** | **Date** | Date of confirmation of contract | [optional] 
**daysToComplete** | **Number** | Number of days to perform the contract | [optional] 
**dateCompleted** | **Date** | Date of completed of contract | [optional] 
**price** | **Number** | Price of contract (for ItemsExchange and Auctions) | [optional] 
**reward** | **Number** | Remuneration for contract (for Couriers only) | [optional] 
**collateral** | **Number** | Collateral price (for Couriers only) | [optional] 
**buyout** | **Number** | Buyout price (for Auctions only) | [optional] 
**volume** | **Number** | Volume of items in the contract | [optional] 


<a name="TypeEnum"></a>
## Enum: TypeEnum


* `unknown` (value: `"unknown"`)

* `item_exchange` (value: `"item_exchange"`)

* `auction` (value: `"auction"`)

* `courier` (value: `"courier"`)

* `loan` (value: `"loan"`)




<a name="StatusEnum"></a>
## Enum: StatusEnum


* `outstanding` (value: `"outstanding"`)

* `in_progress` (value: `"in_progress"`)

* `finished_issuer` (value: `"finished_issuer"`)

* `finished_contractor` (value: `"finished_contractor"`)

* `finished` (value: `"finished"`)

* `cancelled` (value: `"cancelled"`)

* `rejected` (value: `"rejected"`)

* `failed` (value: `"failed"`)

* `deleted` (value: `"deleted"`)

* `reversed` (value: `"reversed"`)




<a name="AvailabilityEnum"></a>
## Enum: AvailabilityEnum


* `public` (value: `"public"`)

* `personal` (value: `"personal"`)

* `corporation` (value: `"corporation"`)

* `alliance` (value: `"alliance"`)




