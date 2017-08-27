import {Meteor} from 'meteor/meteor';
import {DDP} from 'meteor/ddp-client';

export const forward = (api, {data}, callback) => {
  try {
    const {host, port} = Meteor.settings.bots;
    const BotsServer = DDP.connect(`http://${host}:${port}`);
    console.log('forwarding alarm Data to Bots API');
    BotsServer.call(api, {data}, (err, res) => {
      callback(err, res);
    });
  } catch(err) {
    callback(new Meteor.Error('BOTS_API_PROXY.forwardAlarmData', err.message));
  }
};