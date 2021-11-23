import { useRouter } from "next/router";
import Header from "./header";

export default function Plant() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <h1>Plant</h1>
    </div>
  );
}
