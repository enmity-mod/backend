import Database from '@db';

Database.connect().then(() => {
   // Start bot
   require('./bot');

   // Start API
   require('./api');
});