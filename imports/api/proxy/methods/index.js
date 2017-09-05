import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {forward} from '/imports/api/bots/methods';

const Methods = {};

Methods.testMethod = new ValidatedMethod({
  name: 'api.proxy.notify',
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to call this method',//Optional
    reason: 'You need to login' //Optional
  },
  validate: null,
  run({data}) {
    console.log('data', data);
    try {
      if(data) {
        if(data.Records) {
          if(data.Records[0]) {
            if(data.Records[0].Sns) {
              const alarmData = data.Records[0].Sns;
              console.log('gonna forward alarmData to Bots API');
              forward('bots.notify', {data: alarmData}, (err) => {
                if(err) {
                  return `Sending alarm data to Bots API failed: ${err.reason}`;
                }
              });
              return 'sent alarm data to bots api';
            }
          }
        }
      }
    } catch(err) {
      throw new Meteor.Error('api.proxy.notify', err.message);
    }
  }
});

export default Methods