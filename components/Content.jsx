import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import { useRouter } from 'next/router';

const Content = () => {
  const router = useRouter();
  return (
    <main className="content">
      {router.pathname === '/register' && <FormRegister></FormRegister>}
      {router.pathname === '/login' && <FormLogin></FormLogin>}
    </main>
  );
};

export default Content;
