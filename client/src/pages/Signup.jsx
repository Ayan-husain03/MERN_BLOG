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
import { LoginRoute } from "@/helper/RouteName";
import { Loader2 } from "lucide-react";
import { AlertPop } from "@/helper/Alert";
import { Eye } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const formSchema = z
    .object({
      username: z
        .string()
        .min(4, { message: "Username must be at least 4 charactor long" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Both password & confirm passrword should match",
      path: ["confirmPassword"],
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  //   console.log(form.formState.isSubmitting);
  const onSubmit = async (values) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        AlertPop("error", "Cannot create user something wrong");
      }
      console.log(data);
      navigate(LoginRoute);
      AlertPop("success", "User created successfully");
    } catch (error) {
      console.log("Error creating user something wrong :", error);
      AlertPop("error", "Something went wrong");
    }
  };
  return (
    <>
      <Background>
        <Form {...form}>
          <div className="mb-10 text-center">
            <h1 className="font-bold text-2xl md:text-3xl">
              Register Your Account
            </h1>
          </div>
          <div className="my-5">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="p-5"
                        placeholder="Enter your Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="p-5"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Register
                  </>
                ) : (
                  " Register"
                )}
                {/*  */}
              </Button>
            </form>
          </div>
          <div className="flex items-center justify-center gap-2 mt-5">
            <p>Already have an account</p>
            <span className="text-blue-600 hover:underline">
              <Link to={LoginRoute}>Login</Link>
            </span>
          </div>
        </Form>
      </Background>
    </>
  );
}

export default Signup;
