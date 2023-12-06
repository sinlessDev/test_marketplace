import Container from "./container";
import Hero from "./hero";
import Navbar from "./nav";

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
