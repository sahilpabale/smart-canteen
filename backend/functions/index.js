const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./smart-canteen-475bf-firebase-adminsdk-xw1s2-e1b58fd442.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.validateVesEmail = functions.auth
  .user()
  .beforeCreate((user, context) => {
    if (!user.email || !user.email.includes('@ves.ac.in')) {
      throw new functions.auth.HttpsError(
        'invalid-argument',
        `Unauthorized email "${user.email}"`
      );
    }
  });

exports.storeUserDataAfterSignup = functions.auth
  .user()
  .onCreate(async user => {
    const { email, displayName, photoURL, uid, metadata } = user;
    try {
      const docRef = await db.collection('users').doc(uid).set({
        uid,
        displayName,
        email,
        photoURL,
        creationTime: metadata.creationTime,
      });

      console.log(`doc with id: ${docRef}`);
    } catch (error) {
      throw new functions.auth.HttpsError(
        'signup-data-error',
        'Failed to store signup data'
      );
    }
  });
