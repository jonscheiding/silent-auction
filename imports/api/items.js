import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import itemContent from './items.json';

export const Items = new Mongo.Collection('items', {
  transform: (item) => {
    const content = itemContent.find((i) => i.reference === item.reference);

    return {
      ...item,
      content,
    };
  },
});

if (Meteor.isServer) {
  Meteor.publish('items', () => Items.find({}));

  Meteor.startup(() => {
    for (const item of itemContent) {
      Items.upsert(
        { reference: item.reference },
        {
          $setOnInsert: {
            reference: item.reference,
          },
        },
      );
    }
  });
}
