#!/bin/bash

#specify the private.key path here
PRIVATE_KEY_PATH=
YOUR_APP_ID=
USER_NAME=
USER_NAME_2=
CONVERSATION_NAME=

echo PRIVATE_KEY_PATH is $PRIVATE_KEY_PATH

#move to private.key path directory
cd $PRIVATE_KEY_PATH

#creating a conversation
echo "Creating a conversation"
CONVERSATION_ID=$(nexmo conversation:create display_name=$CONVERSATION_NAME)
YOUR_CONVERSATION_ID=$(echo $CONVERSATION_ID | cut -d':' -f2| sed -e 's/^ *//')
echo "YOUR_CONVERSATION_ID is $YOUR_CONVERSATION_ID"

#creating a user
USER_ID=$(nexmo user:create name=$USER_NAME)
USER_ID_2=$(nexmo user:create name=$USER_NAME_2)
YOUR_USER_ID=$(echo $USER_ID | cut -d':' -f2| sed -e 's/^ *//')
YOUR_USER_ID_2=$(echo $USER_ID_2 | cut -d':' -f2| sed -e 's/^ *//')
echo "YOUR_USER_ID is $YOUR_USER_ID"
echo "YOUR_USER_ID_2 is $YOUR_USER_ID_2"


#add member(user) to a conversation
MEMBER_ID=$(nexmo member:add $YOUR_CONVERSATION_ID action=join channel='{"type":"app"}' user_id=$YOUR_USER_ID)
MEMBER_ID_2=$(nexmo member:add $YOUR_CONVERSATION_ID action=join channel='{"type":"app"}' user_id=$YOUR_USER_ID_2)
YOUR_MEMBER_ID=$(echo $MEMBER_ID | cut -d':' -f2)
YOUR_MEMBER_ID_2=$(echo $MEMBER_ID_2 | cut -d':' -f2)
echo YOUR_MEMBER_ID is $YOUR_MEMBER_ID
echo YOUR_MEMBER_ID_2 is $YOUR_MEMBER_ID_2

#check the member list of the conversation. make sure that the member is added
nexmo member:list $YOUR_CONVERSATION_ID -v

#create USER_JWT
USER_JWT="$(nexmo jwt:generate $PRIVATE_KEY_PATH/private.key sub=$USER_NAME exp=$(($(date +%s)+86400)) acl='{"paths":{"/v1/users/**":{},"/v1/conversations/**":{},"/v1/sessions/**":{},"/v1/devices/**":{},"/v1/image/**":{},"/v3/media/**":{},"/v1/applications/**":{},"/v1/push/**":{},"/v1/knocking/**":{}}}' application_id=$YOUR_APP_ID)"
SECOND_USER_JWT="$(nexmo jwt:generate ./private.key sub=$USER_NAME_2 exp=$(($(date +%s)+86400)) acl='{"paths":{"/v1/users/**":{},"/v1/conversations/**":{},"/v1/sessions/**":{},"/v1/devices/**":{},"/v1/image/**":{},"/v3/media/**":{},"/v1/applications/**":{},"/v1/push/**":{},"/v1/knocking/**":{}}}' application_id=$YOUR_APP_ID)"

echo "USER_JWT: $USER_JWT"
echo "USER_JWT_2: $SECOND_USER_JWT"
