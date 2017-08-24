import {Meteor} from 'meteor/meteor';
import {DDP} from 'meteor/ddp-client';

const forward = ({data}) => {
  const {host, port} = Meteor.settings.bots;
  const BotsServer = DDP.connect(`http://${host}:${port}`);
  BotsServer.call('elastic.test', {data}, (err, res) => {
    if(err) {
      console.log('err', err);
    }
    console.log('res', res);
  });
};

export default forward