import Header from "@/components/header";
import Container from "@/components/landing/container";
import { useAuth } from "../lib/authContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <Container>
        <Header />
        <div>{user?.name}</div>
      </Container>
    </div>
  );
}
