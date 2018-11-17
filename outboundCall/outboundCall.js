const Nexmo = require('nexmo')

const NEXMO_API_KEY = 'ddc4d660';
const NEXMO_API_SECRET = 'dab9d899815c0a9E';
const NEXMO_APPLICATION_ID = 'd5570656-2c87-4eef-a640-c3987cb81a2d';
const NEXMO_APPLICATION_PRIVATE_KEY_PATH = '/Users/sbeliakova/private.key';
const TO_NUMBER = '447933037519';
const NEXMO_NUMBER = '447520631575';
const TO_NUMBER_1 = '447915472361'
const NEXMO_NUMBER_1 = '447418343509';

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
    answer_url: ['http://d5b2f72b.ngrok.io']
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
    answer_url: ['http://d5b2f72b.ngrok.io']
  })