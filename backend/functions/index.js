const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.validateVesEmail = functions.auth
  .user()
  .beforeCreate((user, context) => {
    if (!user.email || user.email.indexOf('@ves.ac.in') === -1) {
      throw new functions.auth.HttpsError(
        'invalid-argument',
        `Unauthorized email "${user.email}"`
      );
    }
  });
