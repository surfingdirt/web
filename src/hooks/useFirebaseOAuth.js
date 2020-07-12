import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const errors = {
  NO_DATA: 'noData',
  NO_TOKEN: 'noToken',
};

export const FACEBOOK = 'facebook';
export const GOOGLE = 'google';

const useFirebaseOAuth = (firebaseConfig) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [oAuthError, setOAuthError] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        // No user, display a link to the sign-in page
        return;
      }

      if (user.providerData.length === 0) {
        // A user, but no provider data: should not happen. Display an error message.
        setOAuthError(errors.NO_DATA);
      } else {
        try {
          setToken(await user.getIdToken());
        } catch (e) {
          console.error('No token found', e);
          setOAuthError(errors.NO_TOKEN);
          return;
        }

        const data = user.providerData[0];
        setDisplayName(data.displayName);
        setEmail(data.email);
        setUserPhoto(data.photoURL);
        setProvider(
          data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID ? FACEBOOK : GOOGLE,
        );
      }
    });
  }, []);

  return { displayName, email, oAuthError, provider, token, userPhoto };
};

export default useFirebaseOAuth;
