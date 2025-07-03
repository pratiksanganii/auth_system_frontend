'use client';
import CommonAuthComponent, {
  ISubmitFunction,
} from '@/components/commonauth.component';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register } = useAuthContext();
  const navigation = useRouter();
  const handleRegister = ({ email, password }: ISubmitFunction) => {
    register(email, password).then(() => {
      navigation.push('/');
    });
  };

  return <CommonAuthComponent type="register" handleSubmit={handleRegister} />;
}
