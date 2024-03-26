import { getCities } from "@/lib/api";
import MainPage from "@/components/mainPage/MainPage";

const Main = async () => {
  const cities = await getCities();
  return <MainPage cities={cities} />;
};
export default Main;
