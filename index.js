exports.sendEmail = functions.database.ref('..path in database..')
  .onWrite(event => {
    const snapshot = event.data;
    const val = snapshot.val();
    console.log(val.email);
    if (!snapshot.changed('..value to change..')) {
      return;
    }
    const mailOptions = {
      from    : '"[name of sender]" <noreply@firebase.com>',
      to      : val.email,
      subject : '[email subject]',
      text    : '[body of email]'
    };
    if (!val.confirmed) {
          return mailTransport.sendMail(mailOptions).then(() => {
            console.log('Email sent to:', val.email);
          }).catch(error => {
            console.error('Error: ', error);
          });
    }
  });
