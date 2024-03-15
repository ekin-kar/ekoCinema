const getData = async () => {
  const res = await fetch("http://localhost:3000/api/cities", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const page = async () => {
  const cities = await getData();
  
  return (
    <div>
      <h1>Cities</h1>
      <ul>
        {cities.map((city) => (
          <li key={city._id}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default page;
