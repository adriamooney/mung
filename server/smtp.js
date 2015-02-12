Meteor.startup(function () {
  smtp = {
    username: 'tbdlabs@gmail.com',   // eg: server@gentlenode.com
    password: 'Fuckthis123!',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port:  587
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});


//  https://gentlenode.com/journal/meteor-20-verify-an-email-with-meteor-accounts/42


//  process.env.MAIL_URL = 'smtp://postmaster%40YOURDOMAIN.mailgun.org:YOURPASSWORD@smtp.mailgun.org:587';});
