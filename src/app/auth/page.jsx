import { Suspense } from 'react';
import AuthPage from '../../components/pages/auth/AuthPage.jsx';

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}
