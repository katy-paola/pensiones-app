import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CardPension from '../../components/CardPension';
import Footer from '../../components/Footer';

const SinglePension = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pension, setPension] = useState(null);

  useEffect(() => {
    const getPension = async () => {
      const res = await fetch(`/api/pension/${id}`);
      const data = await res.json();
      setPension(data);
    };

    getPension();
  }, [id]);

  return (
    <div className="grid-container-view-pension">
      <Header></Header>
      <CardPension
        image={pension?.image}
        name={pension?.name}
        address={pension?.address}
        description={pension?.description}
        price={pension?.price}
        services={pension?.services}
        homeOwner={pension?.HomeOwner}
        location={pension?.location}
        id={pension?.id}
        reviews={pension?.reviews}
      />
      <Footer></Footer>
    </div>
  );
};

export default SinglePension;
