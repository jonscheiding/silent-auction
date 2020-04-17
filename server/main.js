import '../imports/api/auctions';
import { Bidders } from '../imports/api/bidders';
import { Items } from '../imports/api/items';
import { Notifications } from '../imports/api/notifications';
import { sendTemplateEmail } from '../imports/api/email';

(function() {
  let isInitializing = true;

  Notifications.find({}).observeChanges({
    added: (id, fields) => {
      if (isInitializing) { return; }

      const item = Items.findOne({ _id: fields.itemId });
      const bidder = Bidders.findOne({ _id: fields.bidderId });

      if (item == null || bidder == null) { return; }

      switch (fields.type) {
        case 'bid':
          sendTemplateEmail({
            templateName: 'BidEmail',
            to: bidder.emailAddress,
            data: {
              itemTitle: item.content.title,
            },
          });
          break;
        case 'outbid':
          sendTemplateEmail({
            templateName: 'OutbidEmail',
            to: bidder.emailAddress,
            data: {
              itemId: item._id,
              itemTitle: item.content.title,
            },
          });
          break;
        default: break;
      }
    },
  });

  isInitializing = false;
}());
