import Header from '../components/Header';
import ContainerHome from '../components/ContainerHome';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <div className="grid-container-home">
        <Header></Header>
        <ContainerHome></ContainerHome>
        <Footer></Footer>
      </div>
    </>
  );
}
