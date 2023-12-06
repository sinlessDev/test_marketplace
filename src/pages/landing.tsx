import Container from "../components/landing/container";
import Hero from "../components/landing/hero";
import Navbar from "../components/landing/nav";

export default function Landing() {
  return (
    <>
      <Container>
        <Navbar />
        <Hero />
      </Container>
    </>
  );
}
