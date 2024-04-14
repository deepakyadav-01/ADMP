import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loginUser } from "../../services/authService";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ERROR_LOGIN,
  HEAD_ADMIN_DASHBOARD_ENDPOINT,
  ADMIN_DASHBOARD_ENDPOINT,
} from "@/lib/constants/constant";
import { login, common } from "../../lib/constants/string.json";

// Account login component
export default function LoginAccount() {
  const [email, setEmail] = useState(""); // Holds the email
  const [password, setPassword] = useState(""); // Holds the password
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
 
    // Make the API request to login
    loginUser({ email, password })
      .then((response) => {
        // Assuming the API response contains a JWT token and user role
        const { token, role, user } = response.data;

        // Store the token and user information in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        
        localStorage.setItem("user", JSON.stringify(user));

        // Navigate based on the user role
        if (role === common.roleHeadAdmin) {
          navigate(HEAD_ADMIN_DASHBOARD_ENDPOINT);
        } else if (role === common.roleAdmin) {
          navigate(ADMIN_DASHBOARD_ENDPOINT);
        }
      else if (role === common.roleFormSetter) {
        navigate("/formSetter/create-forms");
      }
     else if (role === common.roleApplicant) {
      navigate("/applicant/application-form");
    }
      })
      .catch((error) => {
        // Handle login error (e.g., show an error message)
        toast({
          variant: "destructive",
          title: ERROR_LOGIN,
        });
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {login.loginHeader}
            </CardTitle>
            <CardDescription className="text-center">
              {login.loginTitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{login.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                value={email} // Bind value to the state variable
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{login.password}</Label>
              <Input
                id="password"
                type="password"
                value={password} // Bind value to the state variable
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className="w-full bg-primaryText text-white border-none focus:outline-none rounded-xl"
              onClick={handleLogin}
            > 
              {login.loginHeader}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
