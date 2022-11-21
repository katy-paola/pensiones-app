import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import FormAddPension from './FormAddPension';
import FormEditPension from './FormEditPension';
import { useRouter } from 'next/router';
import ContentProfile from './ContentProfile';

const Content = () => {
  const router = useRouter();

  return (
    <main className="content">
      {router.pathname === '/register' && <FormRegister></FormRegister>}
      {router.pathname === '/login' && <FormLogin></FormLogin>}
      {router.pathname === '/add-pension' && <FormAddPension></FormAddPension>}
      {router.pathname === '/edit-pension' && (
        <FormEditPension></FormEditPension>
      )}
      {router.pathname === '/perfil' && <ContentProfile></ContentProfile>}
    </main>
  );
};

export default Content;
