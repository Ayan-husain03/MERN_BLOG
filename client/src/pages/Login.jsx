import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Background from "@/components/Background";
import { Link, useNavigate } from "react-router";
import { HomeRoute, SignupRoute } from "@/helper/RouteName";
import { AlertPop } from "@/helper/Alert";

function Login() {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //   console.log(form);
  const onSubmit = async (values) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (!res.ok) return AlertPop("error", data.message || "login error");
      navigate(HomeRoute);
      AlertPop("success", "Login successfully");
      console.log(data);
    } catch (error) {
      console.log("Error login : ", error);
      AlertPop("error", `${error?.message || "Error while loading"}`);
    }
  };
  return (
    <Background>
      <Form {...form}>
        <div className="mb-10 text-center">
          <h1 className="font-bold text-2xl md:text-3xl">Login Into Account</h1>
        </div>
        <div className="my-5">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="p-5"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="p-5"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-center gap-2 mt-5">
          <p>Don't have an account</p>
          <span className="text-blue-600 hover:underline">
            <Link to={SignupRoute}>Signup</Link>
          </span>
        </div>
      </Form>
    </Background>
  );
}

export default Login;
