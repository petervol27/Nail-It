import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  test: 'test',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
