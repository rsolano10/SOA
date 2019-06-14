//environment.js
var environments = {
    staging: {
        FIREBASE_API_KEY: "AIzaSyBHH4__R8qeYHQXkJ3d2rZGrMwqF3R9u-U",
        FIREBASE_AUTH_DOMAIN: "adtech-web.firebaseapp.com",
        FIREBASE_DATABASE_URL: "https://adtech-web.firebaseio.com",
        FIREBASE_PROJECT_ID: "adtech-web",
        FIREBASE_STORAGE_BUCKET: "adtech-web.appspot.com",
        FIREBASE_MESSAGING_SENDER_ID: "206199639775",
        FIREBASE_APP_ID: "1:206199639775:web:72fa3a610ea506d4",
        GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyACwKoySeT0M5srtlA_dGbMdIcSs-jXxOs"
    },
    production: {
        // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
};

function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
        return 'staging';
    } else if (releaseChannel === 'staging') {
        return 'staging';
    } else {
        return 'staging';
    }
}
function getEnvironment(env) {
    console.log('Release Channel: ', getReleaseChannel());
    return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment; 