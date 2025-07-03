'use client';
import CommonAuthComponent, {
  ISubmitFunction,
} from '@/components/commonauth.component';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuthContext();
  const navigator = useRouter();

  const handleLogin = ({ email, password }: ISubmitFunction) => {
    login(email, password).then(() => {
      navigator.push('/');
    });
  };

  return <CommonAuthComponent type="login" handleSubmit={handleLogin} />;
}
