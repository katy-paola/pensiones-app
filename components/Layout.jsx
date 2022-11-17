import Navbar from './Navbar';

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container py-4">{children}</main>
    </>
  );
};
