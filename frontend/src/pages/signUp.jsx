import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        <SignUp path="/sign-up" signInUrl="/sign-in" />
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600 font-medium underline">
            Sign In
          </Link>
        </p>
        <p className="text-center mt-2 text-xs text-gray-500">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
