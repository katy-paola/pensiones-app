import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Main from '../components/Main';
import Aside from '../components/Aside';
import Footer from '../components/Footer';

export default function Home() {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <div className="grid-container-landing">
          <Header></Header>
          <Main></Main>
          <Aside></Aside>
          <Footer></Footer>
        </div>
      </>
    );
  }
  return <></>;
}
