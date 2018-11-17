const Nexmo = require('nexmo')

const NEXMO_API_KEY = ;
const NEXMO_API_SECRET = ;
const NEXMO_APPLICATION_ID = ;
const NEXMO_APPLICATION_PRIVATE_KEY_PATH = ;
const TO_NUMBER = ;
const NEXMO_NUMBER = ;
const TO_NUMBER_1 = ;
const NEXMO_NUMBER_1 = ;

const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET,
  applicationId: NEXMO_APPLICATION_ID,
  privateKey: NEXMO_APPLICATION_PRIVATE_KEY_PATH
})

nexmo.calls.create({
    to: [{
      type: 'phone',
      number: TO_NUMBER
    }],
    from: {
      type: 'phone',
      number: NEXMO_NUMBER
    },
    answer_url: []
  })

  nexmo.calls.create({
    to: [{
      type: 'phone',
      number: TO_NUMBER_1
    }],
    from: {
      type: 'phone',
      number: NEXMO_NUMBER_1
    },
    answer_url: []
  })