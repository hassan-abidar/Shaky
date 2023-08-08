import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-8">
        <img src="/logo_f.png" alt="Logo" className="w-32" />
      </div>
      <div className="space-x-4">
        <Link href="/sign-in">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Login
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="bg-violet-500 hover:bg-violet-600 text-white">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
