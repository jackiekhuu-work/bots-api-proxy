import {Meteor} from 'meteor/meteor';
import {Restivus} from 'meteor/nimble:restivus';

const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});


// Maps to: /api/workplace/
Api.addRoute('workplace', {authRequired: true}, {
  post: {
    action: function () {
      try {
        const {method} = this.bodyParams;

        switch (method) {
          case 'graph.postMessage': {
            const {groupId, message} = this.bodyParams;

            const {host, port} = Meteor.settings.bots;
            const BotsServer = DDP.connect(`http://${host}:${port}`);
            const result = BotsServer.call(method, {groupId: Number(groupId), message});
            return result;
          }
          default: {
            return {
              statusCode: 404,
              headers: {
                'Content-Type': 'text/plain',
                'X-Custom-Header': 'custom value'
              },
              body: `Method ${method} is unsupported!`
            };
          }
        }
      } catch(err) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'text/plain',
            'X-Custom-Header': 'custom value'
          },
          body: err.message
        };
      }
    }
  }
});