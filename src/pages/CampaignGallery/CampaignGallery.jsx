const CampaignGallery = () => {
  return (
    <section className="py-6 w-11/12 mx-auto">
      <h1 className="text-5xl text-center font-bold mb-7 uppercase">
        Campaign Gallery
      </h1>
      <div className="container grid grid-cols-2 gap-4  mx-auto md:grid-cols-4">
        <img
          src="https://i.ibb.co/3ChMH8T/pexels-shvetsa-3786215.jpg"
          alt=""
          className="object-contain w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 bg-gray-500 aspect-square"
        />
        <img
          alt=""
          className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
          src="https://i.ibb.co/n7NfKqQ/pexels-anna-madera-737731338-18523230.jpg"
        />
        <img
          alt=""
          className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
          src="https://i.ibb.co/fx2J3ZF/pexels-rsapmech-13009648.jpg"
        />
        <img
          alt=""
          className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
          src="https://i.ibb.co/0BC6xk5/pexels-rsapmech-13009643.jpg"
        />
        <img
          alt=""
          className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
          src="https://i.ibb.co/5WFZ98p/luann-hunt-X20g2-GQs-Vd-A-unsplash.jpg"
        />
        <img
          alt=""
          className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
          src="https://i.ibb.co/qJ0hYC9/pexels-karolina-grabowska-6629401.jpg"
        />
        <img
          alt=""
          className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
          src="https://i.ibb.co/KV4ccHP/pexels-anntarazevich-7904446.jpg"
        />
        <img
          alt=""
          className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
          src="https://i.ibb.co/6nX1gqW/pexels-cdc-library-3993211.jpg"
        />
        <img
          alt=""
          className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
          src="https://i.ibb.co/0M6z6K8/pexels-franco30-12193105.jpg"
        />
        <img
          src="https://i.ibb.co/wyrYYWF/pexels-cristian-rojas-8460341.jpg"
          alt=""
          className=" w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 bg-gray-500 aspect-square"
        />
      </div>
    </section>
  );
};

export default CampaignGallery;
