# EveSwaggerInterface.GetCorporationsCorporationIdContracts200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**acceptorId** | **Number** | Who will accept the contract | 
**assigneeId** | **Number** | ID to whom the contract is assigned, can be corporation or character ID | 
**availability** | **String** | To whom the contract is available | 
**buyout** | **Number** | Buyout price (for Auctions only) | [optional] 
**collateral** | **Number** | Collateral price (for Couriers only) | [optional] 
**contractId** | **Number** | contract_id integer | 
**dateAccepted** | **Date** | Date of confirmation of contract | [optional] 
**dateCompleted** | **Date** | Date of completed of contract | [optional] 
**dateExpired** | **Date** | Expiration date of the contract | 
**dateIssued** | **Date** | Сreation date of the contract | 
**daysToComplete** | **Number** | Number of days to perform the contract | [optional] 
**endLocationId** | **Number** | End location ID (for Couriers contract) | [optional] 
**forCorporation** | **Boolean** | true if the contract was issued on behalf of the issuer&#39;s corporation | 
**issuerCorporationId** | **Number** | Character&#39;s corporation ID for the issuer | 
**issuerId** | **Number** | Character ID for the issuer | 
**price** | **Number** | Price of contract (for ItemsExchange and Auctions) | [optional] 
**reward** | **Number** | Remuneration for contract (for Couriers only) | [optional] 
**startLocationId** | **Number** | Start location ID (for Couriers contract) | [optional] 
**status** | **String** | Status of the the contract | 
**title** | **String** | Title of the contract | [optional] 
**type** | **String** | Type of the contract | 
**volume** | **Number** | Volume of items in the contract | [optional] 


<a name="AvailabilityEnum"></a>
## Enum: AvailabilityEnum


* `public` (value: `"public"`)

* `personal` (value: `"personal"`)

* `corporation` (value: `"corporation"`)

* `alliance` (value: `"alliance"`)




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




<a name="TypeEnum"></a>
## Enum: TypeEnum


* `unknown` (value: `"unknown"`)

* `item_exchange` (value: `"item_exchange"`)

* `auction` (value: `"auction"`)

* `courier` (value: `"courier"`)

* `loan` (value: `"loan"`)




