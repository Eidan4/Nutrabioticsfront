import "./home.css";
import Dashboard from "@/components/home/Dashboard/Dashboard";
import Carousel from "@/components/home/Carousel/Carousel";
import History from "@/components/home/History/History";

export default function HomePage() {
  return (
    <div className="min-h-screen home-content">
      <Dashboard></Dashboard>
      <Carousel></Carousel>
      <History></History>
    </div>
  );
}