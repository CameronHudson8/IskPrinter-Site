# EveSwaggerInterface.GetCharactersCharacterIdChatChannels200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**channelId** | **Number** | Unique channel ID. Always negative for player-created channels. Permanent (CCP created) channels have a positive ID, but don&#39;t appear in the API | 
**name** | **String** | Displayed name of channel | 
**ownerId** | **Number** | owner_id integer | 
**comparisonKey** | **String** | Normalized, unique string used to compare channel names | 
**hasPassword** | **Boolean** | If this is a password protected channel | 
**motd** | **String** | Message of the day for this channel | 
**allowed** | [**[GetCharactersCharacterIdChatChannelsAllowed]**](GetCharactersCharacterIdChatChannelsAllowed.md) | allowed array | 
**operators** | [**[GetCharactersCharacterIdChatChannelsOperator]**](GetCharactersCharacterIdChatChannelsOperator.md) | operators array | 
**blocked** | [**[GetCharactersCharacterIdChatChannelsBlocked]**](GetCharactersCharacterIdChatChannelsBlocked.md) | blocked array | 
**muted** | [**[GetCharactersCharacterIdChatChannelsMuted]**](GetCharactersCharacterIdChatChannelsMuted.md) | muted array | 


