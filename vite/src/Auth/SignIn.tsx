import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MicrosoftLogo from "./../assets/images/Microsoft-Logo.svg";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignIn() {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    if (accounts.length > 0) {
      navigate("/");
    }
  }, [accounts, navigate]);

  const handleLogin = () => {
    instance.loginPopup().catch((error) => console.error(error));
  };

  const handleSubmit = () => {
    console.log("Success");
  };

  return (
    <div className="flex w-full">
      <div className="flex-1">
        <div className="h-full bg-gradient-to-b from-gray-100 to-gray-200 pattern-checks-sm translate-y-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              //   style={{
              //     backgroundImage:
              //       "url(src/asset/images/recode_solutions_logo.jpg)",
              //   }}
            />
            <div className="relative flex items-center justify-start z-20 mt-auto  backdrop-blur-sm p-2 rounded-lg gap-2">
              <img
                src="src/asset/images/recode_solutions_logo.jpg"
                alt="logo"
                className="w-24 h-24 p-1 mx-1 bg-white shadow-lg"
              />
              <blockquote className="space-y-2 text-black">
                <p className="text-lg">Asset Management</p>
                <footer className="text-sm ">Recode Solutions</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 ">
        <div className="min-h-screen bg-slate-200 flex justify-center items-center p-4">
          <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
              <CardDescription>
                Enter your details below to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="m@example.com"
                      required
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/* <Link
                      className="ml-auto inline-block text-sm underline"
                      href="#"
                    >
                      Forgot your password?
                    </Link> */}
                    </div>
                    <Input id="password" required type="password" />
                  </div>
                  <Button className="w-full" type="submit">
                    Sign In
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full items-center"
                  variant="outline"
                  onClick={handleLogin}
                >
                  <img
                    src={MicrosoftLogo}
                    alt="Microsoft Logo"
                    className="px-3"
                  />
                  Sign in with Microsoft
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                {/* Don't have an account?
                <Link className="underline" href="#">
                  Sign up
                </Link> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
