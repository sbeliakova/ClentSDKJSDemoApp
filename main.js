const USER_JWT = '';
const SECOND_USER_JWT = '';
const YOUR_CONVERSATION_ID = '' ;

 class ChatApp {
  constructor() {
    this.messageTextarea = document.getElementById('messageTextarea')
    this.messageFeed = document.getElementById('messageFeed')
    this.sendButton = document.getElementById('send-message')
    this.loginForm = document.getElementById('login')
    this.conversationList = document.getElementById('conversations')
    this.leaveButton = document.getElementById('leave')
    this.audio = document.getElementById('audio')
    this.enableButton = document.getElementById('enable')
    this.disableButton = document.getElementById('disable')
    this.callForm = document.getElementById('call-form')
    this.callIncoming = document.getElementById('call-incoming')
    this.callMembers = document.getElementById('call-members')
    this.callYes = document.getElementById('yes')
    this.callNo = document.getElementById('no')
    this.hangUpButton = document.getElementById('hang-up')
    this.loginUsername = document.getElementById('login-username')
    this.conversationListPlaceholder = document.getElementById('conversation-list-placeholder')
    this.callFormUsername = document.getElementById('call-form-username')
    this.callPhoneFormPhonenumber = document.getElementById('call-phone-form-phonenumber')
    this.callPhoneFormButton = document.getElementById('call-phone-form-button')
    this.selfVideo = document.getElementById('self-video')
    this.conversationVideo = document.getElementById('conversation-video')
    this.enableVideoButton = document.getElementById('enable-video')
    this.disableVideoButton = document.getElementById('disable-video')
    this.setupUserEvents()
  }
  errorLogger(error) {
    console.log(error)
  }
  eventLogger(event) {
    return () => {
      console.log("'%s' event was sent", event)
    }
  }
  memberEventHandler(type) {
    return (member, event) => {
      const date = new Date(Date.parse(event.timestamp))
      console.log(`*** ${member.user.name} ${type} the conversation`)
      const text = `${member.user.name} @ ${date}: <b>${type} the conversation</b><br>`
      this.messageFeed.innerHTML = text + this.messageFeed.innerHTML
    }
  }
  authenticate(username) {
    console.log(`Username: ${username}'`)
   // return username.toLowerCase() === "" ? USER_JWT : SECOND_USER_JWT
      return username === "" ? USER_JWT : SECOND_USER_JWT
  }

  showConversationHistory(conversation) {
    console.log("showConversationHistory called");
    conversation.getEvents().then((events) => {
      var eventsHistory = ""
      events.forEach((value, key) => {
        console.log("ConversationHistoryEvent: type: " + value.type);
        console.log("Value: " + value);
        if (conversation.members.get(value.from)) {
          const date = new Date(Date.parse(value.timestamp))
          switch (value.type) {
            case 'text:seen':
              break;
            case 'text:delivered':
              break;
            case 'text':
              eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>${value.body.text}</b><br>` + eventsHistory
              break;
            case 'member:joined':
              eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>joined the conversation</b><br>` + eventsHistory
              break;
            case 'member:left':
              eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>left the conversation</b><br>` + eventsHistory
              break;
            case 'member:invited':
              eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>invited to the conversation</b><br>` + eventsHistory
              break;
            // case 'member:media':
            //   eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>${value.body.audio ? "enabled" : "disabled"} audio</b><br>` + eventsHistory
            //   break;
            case 'member:media':
              console.log("member:media value.body.audio: " + value.body.audio);
              console.log("member:media value.body.video: " + value.body.video);
              if (value.body.audio) {
                eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>${value.body.audio ? "enabled" : "disabled"} audio</b><br>` + eventsHistory
              } else {
                eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>${value.body.video ? "enabled" : "disabled"} video</b><br>` + eventsHistory
                console.log("value.body.video: " + value.body.video);
              }
              break;
            default:
              eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>unknown event</b><br>` + eventsHistory
          }
        }
      })
      this.messageFeed.innerHTML = eventsHistory + this.messageFeed.innerHTML
    })
  }

  setupConversationEvents(conversation) {
    this.conversation = conversation
    this.conversationList.style.display = 'none'
    document.getElementById("messages").style.display = "block"
    console.log('*** Conversation Retrieved', conversation)
    console.log('*** Conversation Member', conversation.me)
    // Bind to events on the conversation
    conversation.on('text', (sender, message) => {
      console.log('*** Message received', sender, message)
      const date = new Date(Date.parse(message.timestamp))
      const text = `${sender.user.name} @ ${date}: <b>${message.body.text}</b><br>`
      this.messageFeed.innerHTML = text + this.messageFeed.innerHTML
      if (sender.user.name !== this.conversation.me.user.name) {
        message.seen().then(this.eventLogger('text:seen')).catch(this.errorLogger)
      }
    })
    conversation.on("member:joined", this.memberEventHandler('joined'))
    conversation.on("member:left", this.memberEventHandler('left'))
    // conversation.on("member:media", (member, event) => {
    //   console.log(`*** Member changed media state`, member, event)
    //   const text = `${member.user.name} <b>${event.body.audio ? 'enabled' : 'disabled'} audio in the conversation</b><br>`
    //   this.messageFeed.innerHTML = text + this.messageFeed.innerHTML
    // })
    conversation.on("member:media", (member, event) => {
      console.log(`*** Member changed media state`, member, event)
      var text
      if (event.body.audio !== undefined) {
        text = `${member.user.name} <b>${event.body.audio ? 'enabled' : 'disabled'} audio in the conversation</b><br>`
      } else {
        text = `${member.user.name} <b>${event.body.video ? 'enabled' : 'disabled'} video in the conversation</b><br>`
      }
      this.messageFeed.innerHTML = text + this.messageFeed.innerHTML;
    })

    conversation.me.on("media:stream:on", (stream) => {
      console.log("Event: media:stream:on");
      if ("srcObject" in this.selfVideo) {
        this.selfVideo.srcObject = stream.localStream;
        console.log("conversation.me.on(\"media:stream:on\"");
      } else {
        // Avoid using this in new browsers, as it is going away.
        this.selfVideo.src = window.URL.createObjectURL(stream.localStream);
      }
    })
    this.showConversationHistory(conversation)
    conversation.on("text:seen", (data, text) => console.log(`${data.user.name} saw text: ${text.body.text}`))
    conversation.on("text:typing:off", data => console.log(`${data.user.name} stopped typing...`))
    conversation.on("text:typing:on", data => console.log(`${data.user.name} started typing...`))


    for (let member of conversation.members.values()) {
      if (member.user.name != conversation.me.user.name) {
        member.on("media:stream:on", (stream) => {
            if ("srcObject" in this.conversationVideo) {
              this.conversationVideo.srcObject = stream.stream;
              console.log("conversation.members.on(\"media:stream:on\"");
            } else {
              // Avoid using this in new browsers, as it is going away.
              this.conversationVideo.src = window.URL.createObjectURL(stream.stream);
            }
          }
        )
      }
    }
  }

  updateConversationsList(conversations) {

    let conversationsElement = document.createElement("div")
    conversationsElement.classList = 'list-group'
    for (let id in conversations) {
      let conversationElement = document.createElement('button')
      conversationElement.type = 'button'
      conversationElement.classList = 'list-group-item list-group-item-action'
      conversationElement.textContent = conversations[id].display_name
      conversationElement.addEventListener("click", () => this.setupConversationEvents(conversations[id]))
      conversationsElement.appendChild(conversationElement)
    }
    if (!conversationsElement.childNodes.length) {
      conversationsElement.textContent = "You are not a member of any conversations"
    }
    this.conversationListPlaceholder.appendChild(conversationsElement)
    this.conversationList.style.display = 'block'
    this.loginForm.style.display = 'none'
  }

  listConversations(userToken) {
    new ConversationClient({
        debug: true
      })
      .login(userToken)
      .then(app => {
        console.log('*** Logged into app', app)
        this.app = app
        
        app.on("member:call", (member, call) => {
          this.call = call
          console.log("member:call - ", call);
          if ((this.call.from != "unknown") && (this.app.me.name != this.call.from.user.name)) {
            this.showCallIncoming(call.from)
          } else {
            console.log("This is inbound call: " + this.call);
            this.showCallIncoming(call.from);
            // this.showCallMembers("unknown")
          }
        })

        app.on("call:status:changed", (call) => {
          console.log("call:status:changed - ", call.status)
          console.log(` my leg id -> ${call.id}`);
        })

        app.on("member:invited", (member, event) => {
          //identify the sender and type of conversation.
          if (event.body.cname.indexOf("CALL") != 0 && event.invited_by) {
            console.log("*** Invitation received:", event);
            //accept an invitation.
            app.getConversation(event.cid || event.body.cname)
              .then((conversation) => {
                this.conversation = conversation
                conversation.join().then(() => {
                  var conversationDictionary = {}
                  conversationDictionary[this.conversation.id] = this.conversation
                  this.updateConversationsList(conversationDictionary)
                }).catch(this.errorLogger)
              })
              .catch(this.errorLogger)
          }
        })
        return app.getConversations()
      })
      .then((conversations) => {
        console.log('*** Retrieved conversations', conversations)
        this.updateConversationsList(conversations)
      })
      .catch(this.errorLogger)
    }

  setupUserEvents() {
    this.sendButton.addEventListener('click', () => {
      this.conversation.sendText(this.messageTextarea.value).then(() => {
        this.eventLogger('text')()
        this.messageTextarea.value = ''
      }).catch(this.errorLogger)
    })
    this.loginForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const userToken = this.authenticate(this.loginUsername.value)
      if (userToken) {
        this.listConversations(userToken)
      }
    })
    this.messageTextarea.addEventListener('focus', () => {
      this.conversation.startTyping().then(this.eventLogger('text:typing:on')).catch(this.errorLogger)
    });
    this.messageTextarea.addEventListener('blur', () => {
      this.conversation.stopTyping().then(this.eventLogger('text:typing:off')).catch(this.errorLogger)
    })
    this.leaveButton.addEventListener('click', () => {
      this.conversation.leave().then(this.eventLogger('member:left')).catch(this.errorLogger)
    })
    this.enableButton.addEventListener('click', () => {
      this.conversation.media.enable().then(stream => {
        // Older browsers may not have srcObject
        if ("srcObject" in this.audio) {
          this.audio.srcObject = stream;
        } else {
          // Avoid using this in new browsers, as it is going away.
          this.audio.src = window.URL.createObjectURL(stream);
        }
        this.audio.onloadedmetadata = () => {
          this.audio.play();
        }
        this.eventLogger('member:media')()
      }).catch(this.errorLogger)
    })
    this.disableButton.addEventListener('click', () => {
      this.conversation.media.disable().then(this.eventLogger('member:media')).catch(this.errorLogger)
    })

     this.callForm.addEventListener('click', (event) => {
      event.preventDefault()
      var usernames = this.callFormUsername.value.split(",").map(username => username.trim())
      this.app.call(usernames)
      })

      this.hangUpButton.addEventListener('click', () => {
        this.call.hangUp()
        this.callMembers.style.display = "none"
      })

      this.callYes.addEventListener('click', () => {
        this.call.answer()
        this.showCallMembers(this.call.from)
      })

      this.callNo.addEventListener('click', () => {
        this.call.hangUp()
        this.callIncoming.style.display = "none"
      })

      this.callPhoneFormButton.addEventListener('click', (event) => {
        
        this.app.on("call:status:changed", (call) => {
			if (call.status === call.CALL_STATUS.STARTED) {
                console.log('the call has started')
                console.log(` my leg id -> ${call.id}`);
            }
            console.log(`Call status changed to ${call.status}`)
		})
        let phone_number = this.callPhoneFormPhonenumber.value
        event.preventDefault()
        console.log("Calling to PSTN: " + phone_number)
    
        this.app.callPhone(phone_number).then((call) => {
          console.log('Calling phone ', phone_number)
          console.log('from: ', call.from)
          console.log('to: ', call.to)
          console.log('status: ', call.status)
        });

      })

      this.enableVideoButton.addEventListener('click', () => {
        console.log("enableVideo button is clicked");
        this.conversation.media.enable({
          video: "both"
        }).then(this.eventLogger('member:media')).catch(this.errorLogger)
      })
      this.disableVideoButton.addEventListener('click', () => {
        console.log("disableVideo button is clicked");
        this.conversation.media.disable().then(this.eventLogger('member:media')).catch(this.errorLogger)
      })
  }

  showCallIncoming(member) {
    var memberName
    if (member == "unknown") {
      memberName = "a phone"
    } else {
      memberName = member.user.name
    }
    this.callIncoming.style.display = "block"
    this.callIncoming.children[0].textContent = "Incoming call from " + memberName + ". Do you want to answer?"
  }

  showCallMembers(member) {
    var memberName
    if (member == "unknown") {
      memberName = "a phone"
    } else {
      memberName = member.user.name
    }
    this.callMembers.style.display = "block"
    this.callIncoming.style.display = "none"
    this.callMembers.children[0].textContent = "You are in a call with " + memberName
 }

}

let app = null
let dbg = null
window.onload = function() {
    app = new ChatApp()
}
