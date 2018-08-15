# EveSwaggerInterface.GetCharactersCharacterIdWalletJournal200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **Number** | The amount of ISK given or taken from the wallet as a result of the given transaction. Positive when ISK is deposited into the wallet and negative when ISK is withdrawn | [optional] 
**balance** | **Number** | Wallet balance after transaction occurred | [optional] 
**contextId** | **Number** | An ID that gives extra context to the particular transaction. Because of legacy reasons the context is completely different per ref_type and means different things. It is also possible to not have a context_id | [optional] 
**contextIdType** | **String** | The type of the given context_id if present | [optional] 
**_date** | **Date** | Date and time of transaction | 
**description** | **String** | The reason for the transaction, mirrors what is seen in the client | 
**firstPartyId** | **Number** | The id of the first party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name | [optional] 
**id** | **Number** | Unique journal reference ID | 
**reason** | **String** | The user stated reason for the transaction. Only applies to some ref_types | [optional] 
**refType** | **String** | The transaction type for the given transaction. Different transaction types will populate different attributes. Note: If you have an existing XML API application that is using ref_types, you will need to know which string ESI ref_type maps to which integer. You can look at the following file to see string-&gt;int mappings: https://github.com/ccpgames/eve-glue/blob/master/eve_glue/wallet_journal_ref.py | 
**secondPartyId** | **Number** | The id of the second party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name | [optional] 
**tax** | **Number** | Tax amount received. Only applies to tax related transactions | [optional] 
**taxReceiverId** | **Number** | The corporation ID receiving any tax paid. Only applies to tax related transactions | [optional] 


<a name="ContextIdTypeEnum"></a>
## Enum: ContextIdTypeEnum


* `structure_id` (value: `"structure_id"`)

* `station_id` (value: `"station_id"`)

* `market_transaction_id` (value: `"market_transaction_id"`)

* `character_id` (value: `"character_id"`)

* `corporation_id` (value: `"corporation_id"`)

* `alliance_id` (value: `"alliance_id"`)

* `eve_system` (value: `"eve_system"`)

* `industry_job_id` (value: `"industry_job_id"`)

* `contract_id` (value: `"contract_id"`)

* `planet_id` (value: `"planet_id"`)

* `system_id` (value: `"system_id"`)

* `type_id` (value: `"type_id"`)




<a name="RefTypeEnum"></a>
## Enum: RefTypeEnum


* `acceleration_gate_fee` (value: `"acceleration_gate_fee"`)

* `advertisement_listing_fee` (value: `"advertisement_listing_fee"`)

* `agent_donation` (value: `"agent_donation"`)

* `agent_location_services` (value: `"agent_location_services"`)

* `agent_miscellaneous` (value: `"agent_miscellaneous"`)

* `agent_mission_collateral_paid` (value: `"agent_mission_collateral_paid"`)

* `agent_mission_collateral_refunded` (value: `"agent_mission_collateral_refunded"`)

* `agent_mission_reward` (value: `"agent_mission_reward"`)

* `agent_mission_reward_corporation_tax` (value: `"agent_mission_reward_corporation_tax"`)

* `agent_mission_time_bonus_reward` (value: `"agent_mission_time_bonus_reward"`)

* `agent_mission_time_bonus_reward_corporation_tax` (value: `"agent_mission_time_bonus_reward_corporation_tax"`)

* `agent_security_services` (value: `"agent_security_services"`)

* `agent_services_rendered` (value: `"agent_services_rendered"`)

* `agents_preward` (value: `"agents_preward"`)

* `alliance_maintainance_fee` (value: `"alliance_maintainance_fee"`)

* `alliance_registration_fee` (value: `"alliance_registration_fee"`)

* `asset_safety_recovery_tax` (value: `"asset_safety_recovery_tax"`)

* `bounty` (value: `"bounty"`)

* `bounty_prize` (value: `"bounty_prize"`)

* `bounty_prize_corporation_tax` (value: `"bounty_prize_corporation_tax"`)

* `bounty_prizes` (value: `"bounty_prizes"`)

* `bounty_reimbursement` (value: `"bounty_reimbursement"`)

* `bounty_surcharge` (value: `"bounty_surcharge"`)

* `brokers_fee` (value: `"brokers_fee"`)

* `clone_activation` (value: `"clone_activation"`)

* `clone_transfer` (value: `"clone_transfer"`)

* `contraband_fine` (value: `"contraband_fine"`)

* `contract_auction_bid` (value: `"contract_auction_bid"`)

* `contract_auction_bid_corp` (value: `"contract_auction_bid_corp"`)

* `contract_auction_bid_refund` (value: `"contract_auction_bid_refund"`)

* `contract_auction_sold` (value: `"contract_auction_sold"`)

* `contract_brokers_fee` (value: `"contract_brokers_fee"`)

* `contract_brokers_fee_corp` (value: `"contract_brokers_fee_corp"`)

* `contract_collateral` (value: `"contract_collateral"`)

* `contract_collateral_deposited_corp` (value: `"contract_collateral_deposited_corp"`)

* `contract_collateral_payout` (value: `"contract_collateral_payout"`)

* `contract_collateral_refund` (value: `"contract_collateral_refund"`)

* `contract_deposit` (value: `"contract_deposit"`)

* `contract_deposit_corp` (value: `"contract_deposit_corp"`)

* `contract_deposit_refund` (value: `"contract_deposit_refund"`)

* `contract_deposit_sales_tax` (value: `"contract_deposit_sales_tax"`)

* `contract_price` (value: `"contract_price"`)

* `contract_price_payment_corp` (value: `"contract_price_payment_corp"`)

* `contract_reversal` (value: `"contract_reversal"`)

* `contract_reward` (value: `"contract_reward"`)

* `contract_reward_deposited` (value: `"contract_reward_deposited"`)

* `contract_reward_deposited_corp` (value: `"contract_reward_deposited_corp"`)

* `contract_reward_refund` (value: `"contract_reward_refund"`)

* `contract_sales_tax` (value: `"contract_sales_tax"`)

* `copying` (value: `"copying"`)

* `corporate_reward_payout` (value: `"corporate_reward_payout"`)

* `corporate_reward_tax` (value: `"corporate_reward_tax"`)

* `corporation_account_withdrawal` (value: `"corporation_account_withdrawal"`)

* `corporation_bulk_payment` (value: `"corporation_bulk_payment"`)

* `corporation_dividend_payment` (value: `"corporation_dividend_payment"`)

* `corporation_liquidation` (value: `"corporation_liquidation"`)

* `corporation_logo_change_cost` (value: `"corporation_logo_change_cost"`)

* `corporation_payment` (value: `"corporation_payment"`)

* `corporation_registration_fee` (value: `"corporation_registration_fee"`)

* `courier_mission_escrow` (value: `"courier_mission_escrow"`)

* `cspa` (value: `"cspa"`)

* `cspaofflinerefund` (value: `"cspaofflinerefund"`)

* `datacore_fee` (value: `"datacore_fee"`)

* `dna_modification_fee` (value: `"dna_modification_fee"`)

* `docking_fee` (value: `"docking_fee"`)

* `duel_wager_escrow` (value: `"duel_wager_escrow"`)

* `duel_wager_payment` (value: `"duel_wager_payment"`)

* `duel_wager_refund` (value: `"duel_wager_refund"`)

* `factory_slot_rental_fee` (value: `"factory_slot_rental_fee"`)

* `gm_cash_transfer` (value: `"gm_cash_transfer"`)

* `industry_job_tax` (value: `"industry_job_tax"`)

* `infrastructure_hub_maintenance` (value: `"infrastructure_hub_maintenance"`)

* `inheritance` (value: `"inheritance"`)

* `insurance` (value: `"insurance"`)

* `jump_clone_activation_fee` (value: `"jump_clone_activation_fee"`)

* `jump_clone_installation_fee` (value: `"jump_clone_installation_fee"`)

* `kill_right_fee` (value: `"kill_right_fee"`)

* `lp_store` (value: `"lp_store"`)

* `manufacturing` (value: `"manufacturing"`)

* `market_escrow` (value: `"market_escrow"`)

* `market_fine_paid` (value: `"market_fine_paid"`)

* `market_transaction` (value: `"market_transaction"`)

* `medal_creation` (value: `"medal_creation"`)

* `medal_issued` (value: `"medal_issued"`)

* `mission_completion` (value: `"mission_completion"`)

* `mission_cost` (value: `"mission_cost"`)

* `mission_expiration` (value: `"mission_expiration"`)

* `mission_reward` (value: `"mission_reward"`)

* `office_rental_fee` (value: `"office_rental_fee"`)

* `operation_bonus` (value: `"operation_bonus"`)

* `opportunity_reward` (value: `"opportunity_reward"`)

* `planetary_construction` (value: `"planetary_construction"`)

* `planetary_export_tax` (value: `"planetary_export_tax"`)

* `planetary_import_tax` (value: `"planetary_import_tax"`)

* `player_donation` (value: `"player_donation"`)

* `player_trading` (value: `"player_trading"`)

* `project_discovery_reward` (value: `"project_discovery_reward"`)

* `project_discovery_tax` (value: `"project_discovery_tax"`)

* `reaction` (value: `"reaction"`)

* `release_of_impounded_property` (value: `"release_of_impounded_property"`)

* `repair_bill` (value: `"repair_bill"`)

* `reprocessing_tax` (value: `"reprocessing_tax"`)

* `researching_material_productivity` (value: `"researching_material_productivity"`)

* `researching_technology` (value: `"researching_technology"`)

* `researching_time_productivity` (value: `"researching_time_productivity"`)

* `resource_wars_reward` (value: `"resource_wars_reward"`)

* `reverse_engineering` (value: `"reverse_engineering"`)

* `security_processing_fee` (value: `"security_processing_fee"`)

* `shares` (value: `"shares"`)

* `sovereignity_bill` (value: `"sovereignity_bill"`)

* `store_purchase` (value: `"store_purchase"`)

* `store_purchase_refund` (value: `"store_purchase_refund"`)

* `transaction_tax` (value: `"transaction_tax"`)

* `upkeep_adjustment_fee` (value: `"upkeep_adjustment_fee"`)

* `war_ally_contract` (value: `"war_ally_contract"`)

* `war_fee` (value: `"war_fee"`)

* `war_fee_surrender` (value: `"war_fee_surrender"`)




