// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GoogleSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-background dark:to-muted">
      <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-md flex flex-col items-center">
        {/* <Image
          src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
          width={92}
          height={30}
          className="mb-6"
        /> */}
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-foreground">
          Sign up with Google
        </h2>
        <p className="text-gray-500 dark:text-muted-foreground text-center mb-8 text-sm">
          Create your account to get started
        </p>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-300 dark:border-muted-foreground font-semibold py-3 text-base hover:bg-gray-50 dark:hover:bg-muted transition mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path
                fill="#4285F4"
                d="M24 9.5c3.54 0 6.71 1.22 9.2 3.23l6.88-6.88C35.64 2.13 30.13 0 24 0 14.82 0 6.73 5.8 2.69 14.19l8.01 6.22C12.6 13.98 17.85 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.36 46.1 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.7 28.41a14.5 14.5 0 0 1 0-8.82l-8.01-6.22A23.97 23.97 0 0 0 0 24c0 3.93.94 7.65 2.69 10.63l8.01-6.22z"
              />
              <path
                fill="#EA4335"
                d="M24 48c6.13 0 11.64-2.03 15.54-5.53l-7.19-5.6c-2.01 1.35-4.59 2.13-8.35 2.13-6.15 0-11.4-4.48-13.3-10.5l-8.01 6.22C6.73 42.2 14.82 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </g>
          </svg>
          Sign up with Google
        </Button>
        <div className="text-center text-sm text-gray-500 dark:text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
