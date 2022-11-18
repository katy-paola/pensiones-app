import { useSession } from 'next-auth/react';

const CreatePension = () => {
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());
    console.log(
      '🚀 ~ file: create-pension.jsx ~ line 7 ~ handleSubmit ~ dataObj',
      dataObj
    );

    const res = await fetch('/api/pension/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...dataObj,
        userId: session.user.id,
        image: [dataObj.image],
        price: Number(dataObj.price),
      }),
    });

    const json = await res.json();
    console.log(
      '🚀 ~ file: create-pension.jsx ~ line 26 ~ handleSubmit ~ json',
      json
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />
      <label htmlFor="image">Image</label>
      <input type="text" name="image" id="image" />
      <label htmlFor="price">Price</label>
      <input type="text" name="price" id="price" />
      <label htmlFor="location">Location</label>
      <input type="text" name="location" id="location" />
      <label htmlFor="address">Address</label>
      <input type="text" name="address" id="address" />
      <label htmlFor="amenities">Amenities</label>
      <input type="text" name="amenities" id="amenities" />
      <label htmlFor="services">Services</label>
      <input type="text" name="services" id="services" />
      <label htmlFor="rules">Rules</label>
      <input type="text" name="rules" id="rules" />

      <button type="submit">Create Pension</button>
    </form>
  );
};

export default CreatePension;
