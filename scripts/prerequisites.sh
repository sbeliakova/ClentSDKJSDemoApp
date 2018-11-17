#!/bin/bash

#specify the private.key path here
PRIVATE_KEY_PATH=
YOUR_APP_ID=
USER_NAME=
CONVERSATION_NAME=

echo PRIVATE_KEY_PATH is $PRIVATE_KEY_PATH

#move to private.key path directory
cd $PRIVATE_KEY_PATH

#where am I
echo "I am in: " pwd

#creating a conversation
echo "Creating a conversation"

CONVERSATION_ID=$(nexmo conversation:create display_name=CONVERSATION_NAME)
YOUR_CONVERSATION_ID=$(echo $CONVERSATION_ID | cut -d':' -f2| sed -e 's/^ *//')
echo "YOUR_CONVERSATION_ID is $YOUR_CONVERSATION_ID"

#creating a user
USER_ID=$(nexmo user:create name=$USER_NAME)
YOUR_USER_ID=$(echo $USER_ID | cut -d':' -f2| sed -e 's/^ *//')
echo "YOUR_USER_ID is $YOUR_USER_ID"

#add member(user) to a conversation
MEMBER_ID=$(nexmo member:add $YOUR_CONVERSATION_ID action=join channel='{"type":"app"}' user_id=$YOUR_USER_ID)
YOUR_MEMBER_ID=$(echo $MEMBER_ID | cut -d':' -f2)
echo YOUR_MEMBER_ID is $YOUR_MEMBER_ID

#check the member list of the conversation. make sure that the member is added
nexmo member:list $YOUR_CONVERSATION_ID -v

#creat USER_JWT
USER_JWT="$(nexmo jwt:generate ./private.key sub=$USER_NAME exp=$(($(date +%s)+86400)) acl='{"paths":{"/v1/users/**":{},"/v1/conversations/**":{},"/v1/sessions/**":{},"/v1/devices/**":{},"/v1/image/**":{},"/v3/media/**":{},"/v1/applications/**":{},"/v1/push/**":{},"/v1/knocking/**":{}}}' application_id=d5570656-2c87-4eef-a640-c3987cb81a2d)"

echo "USER_JWT: $USER_JWT"