// Emergency script to fix Firestore rules
// Run this with: node fix-firestore-rules.js

const admin = require('firebase-admin');

// Initialize Firebase Admin (you'll need to download service account key)
const serviceAccount = require('./path-to-your-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Set the rules
const rules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
`;

console.log('Setting Firestore rules...');
console.log('Rules:', rules);

// Note: This requires Firebase Admin SDK and service account key
// For now, try the web console methods above first
