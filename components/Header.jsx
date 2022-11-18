import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <>
      <header className="d-flex">
        <h1>
          <i className="bi bi-houses"></i>
          PensionesApp
        </h1>
        {router.pathname === '/register' && (
          <div className="d-flex div-btn-lg-sup">
            <button className="btn-sm d-none d-md-block btn-lg-sup">
              Iniciar sesión
            </button>
            <button className="d-md-none">
              <i class="bi bi-box-arrow-in-right icon-lg"></i>
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
