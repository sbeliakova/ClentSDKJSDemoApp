const USER_JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDIyMDY2MzcsImp0aSI6ImI3YmFiZGYwLWU4MWItMTFlOC04ZTkwLTYxZmNhZjhlYmMxYiIsInN1YiI6ImR3aWdodCIsImV4cCI6MTU0MjI5MzAzNywiYWNsIjp7InBhdGhzIjp7Ii92MS91c2Vycy8qKiI6e30sIi92MS9jb252ZXJzYXRpb25zLyoqIjp7fSwiL3YxL3Nlc3Npb25zLyoqIjp7fSwiL3YxL2RldmljZXMvKioiOnt9LCIvdjEvaW1hZ2UvKioiOnt9LCIvdjMvbWVkaWEvKioiOnt9LCIvdjEvYXBwbGljYXRpb25zLyoqIjp7fSwiL3YxL3B1c2gvKioiOnt9LCIvdjEva25vY2tpbmcvKioiOnt9fX0sImFwcGxpY2F0aW9uX2lkIjoiZDU1NzA2NTYtMmM4Ny00ZWVmLWE2NDAtYzM5ODdjYjgxYTJkIn0.fr3feF8_IfjCuMdQjQPJb22C8w0YoMBApoScgcOfLMye40QjJGvjg5IDD70XKbLlwZlL3T_PGLpIxmtD97lPctYWInWdCRhRRBgobVaOFE86_gz0DtAnO_M2D6FaL6nKdoTxbupo4oTsEA4WAL6p1XqxTKqTdaWZxyOZ-wVxIlZdADvYZDvX51WwEYcI6oqa-FI7hjO4Z60rWQ2TnKFOO6xfQYpALYlGzsrgiWX8RBw6g8xJc-Y0QY6OXVjnkGOdl1Dff0CUDgJGZjWzDLr6gAB47J2gYlVfkQ_Ki8ejggIVqA7RrWmtKK5rUP0YtFzYbNo_nMTfFlOWcTl1dYnXkg';
const SECOND_USER_JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDE2NzU5MTMsImp0aSI6IjA3NDFiZmEwLWUzNDgtMTFlOC1hMDcxLTg3ZDk4MjZhOGUxOSIsInN1YiI6ImFsaWNlIiwiZXhwIjoxNTQxNzYyMzEyLCJhY2wiOnsicGF0aHMiOnsiL3YxL3VzZXJzLyoqIjp7fSwiL3YxL2NvbnZlcnNhdGlvbnMvKioiOnt9LCIvdjEvc2Vzc2lvbnMvKioiOnt9LCIvdjEvZGV2aWNlcy8qKiI6e30sIi92MS9pbWFnZS8qKiI6e30sIi92My9tZWRpYS8qKiI6e30sIi92MS9hcHBsaWNhdGlvbnMvKioiOnt9LCIvdjEvcHVzaC8qKiI6e30sIi92MS9rbm9ja2luZy8qKiI6e319fSwiYXBwbGljYXRpb25faWQiOiJkNTU3MDY1Ni0yYzg3LTRlZWYtYTY0MC1jMzk4N2NiODFhMmQifQ.RWnYkvNb3rzrgR8BcOf14_y6ea07zfQJjQjvlRNXWz54aVBzTBS7qugDytMxHSwRwyKwpB72zYrtTSbBTPBZQ5cTgl2UV_fuhK3MRcgBtmNp3GgVKCvfbsY4b8OtHyF8MrIMjvys2BKzQ9TETpN0Jk8ir-o4fEJNcDKa0VIE43NdpAaqvLyCpLO9a6zvw5hSgfqV8cF3gF1eBoOfLpLrQrAZt0VJgoOL4d2Bzj48AP0bVa5Vr1NC6nE0bneHR4yjBfRzPuyAUm9dJYIe271Yj6Dv0roxqx5Pgfk9qTxf9l8A9-rlqlwhqIL-iW81IaGg9D-BFeKMZhF5nFMQzbSuEw';
const YOUR_CONVERSATION_ID = 'CON-a7af9e9
5-a642-401c-aad3-c89b3af252c8';

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
    return username.toLowerCase() === "dwight" ? USER_JWT : SECOND_USER_JWT
  }

  showConversationHistory(conversation) {
    conversation.getEvents().then((events) => {
      var eventsHistory = ""
      events.forEach((value, key) => {
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
            case 'member:media':
              eventsHistory = `${conversation.members.get(value.from).user.name} @ ${date}: <b>${value.body.audio ? "enabled" : "disabled"} audio</b><br>` + eventsHistory
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
    conversation.on("member:media", (member, event) => {
      console.log(`*** Member changed media state`, member, event)
      const text = `${member.user.name} <b>${event.body.audio ? 'enabled' : 'disabled'} audio in the conversation</b><br>`
      this.messageFeed.innerHTML = text + this.messageFeed.innerHTML
    })
    this.showConversationHistory(conversation)
    conversation.on("text:seen", (data, text) => console.log(`${data.user.name} saw text: ${text.body.text}`))
    conversation.on("text:typing:off", data => console.log(`${data.user.name} stopped typing...`))
    conversation.on("text:typing:on", data => console.log(`${data.user.name} started typing...`))
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
            this.showCallMembers("unknown")
          }
        })

        app.on("call:status:changed", (call) => {
          console.log("call:status:changed - ", call.status)
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