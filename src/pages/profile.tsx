import Header from "@/components/header";
import Container from "@/components/landing/container";
import { useAuth } from "../lib/authContext";
import ImagePlaceholder from "../assets/hero.svg";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <Container>
        <Header />
        <div className="grid grid-cols-1 gap-10 sm:gap-0 sm:grid-cols-3">
          <div className="border w-fit rounded-lg p-10">
            <img src={ImagePlaceholder} alt="ava" className=" w-56 h-56" />
          </div>
          <div className="space-y-10">
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>
              Verification status:{" "}
              {user?.emailVerification ? (
                <span className="p-1 bg-green-100 rounded-lg">Verified</span>
              ) : (
                <span className="p-1 bg-slate-100 rounded-lg">
                  Not verified
                </span>
              )}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
