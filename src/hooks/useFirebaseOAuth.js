import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const STEP_START = 0;
const STEP_OAUTH_FETCHING_TOKEN = 1;
const STEP_SIGN_IN_IN_PROGRESS = 2;
const STEP_SIGN_IN_SUCCESS = 3;

const STEP_OAUTH_NO_DATA_ERROR = 4;
const STEP_OAUTH_NO_USER = 5;
const STEP_SIGN_IN_ERROR = 6;

export const steps = {
  STEP_START,
  STEP_OAUTH_FETCHING_TOKEN,
  STEP_SIGN_IN_IN_PROGRESS,
  STEP_SIGN_IN_SUCCESS,
  STEP_OAUTH_NO_DATA_ERROR,
  STEP_OAUTH_NO_USER,
  STEP_SIGN_IN_ERROR,
};

export const FACEBOOK = 'facebook';
export const GOOGLE = 'google';

const useFirebaseOAuth = (firebaseConfig) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [step, setStep] = useState(STEP_START);
  const [userPhoto, setUserPhoto] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    setStep(STEP_OAUTH_FETCHING_TOKEN);

    firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        // No user, display a link to the sign-in page
        setStep(STEP_OAUTH_NO_USER);
      } else if (user.providerData.length === 0) {
        // A user, but no provider data: should not happen. Display an error message.
        setStep(STEP_OAUTH_NO_DATA_ERROR);
      } else {
        // A user with provider data. Get token
        let token;
        try {
          token = await user.getIdToken();
        } catch (e) {
          setStep(STEP_SIGN_IN_ERROR);
        }

        if (token) {
          // Perform login
          const { displayName, email, photoURL, providerId } = user.providerData[0];
          setUserPhoto(photoURL);
          setProvider(
            providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID ? FACEBOOK : GOOGLE,
          );
          setStep(STEP_SIGN_IN_IN_PROGRESS);

          try {
            const payload = { displayName, email, photoURL, providerId, token };
            await new Promise((resolve) => {
              setTimeout(() => {
                console.log('Fake user created!', payload);
                resolve();
              }, 2000);
            });
            setStep(STEP_SIGN_IN_SUCCESS);
          } catch (e) {
            setStep(STEP_SIGN_IN_ERROR);
          }
        }
      }
    });
  }, []);

  return { step, userPhoto, provider };
};

export default useFirebaseOAuth;
