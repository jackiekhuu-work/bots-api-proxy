import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import forward from '/imports/api/bots/methods/forward';

const Methods = {};

Methods.testMethod = new ValidatedMethod({
  name: 'api.test',
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to call this method',//Optional
    reason: 'You need to login' //Optional
  },
  validate: null,
  run({data}) {
    try {
      console.log('someone is calling us with data', data);
      console.log('gonna forward calling');
      forward({data});
      return 'test success';
    } catch(err) {
      throw new Meteor.Error('api.test', err.message);
    }
  }
});

export default Methods