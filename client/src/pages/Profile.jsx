import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { z } from "zod";

function Profile() {
  const user = useSelector((state) => state.user);
  const formSchema = z.object({
    name: z.string().min(4, { message: "name must be 4 character long" }),
    email: z.string().email({ message: "Invalid email address" }),
    bio: z.string().min(4, { message: "bio must be 4 character long" }),
    password: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });
  const onSubmit = () => {};
  return (
    <Card className="">
      <CardContent>
        <div className="flex justify-center items-center">
          <Avatar className="w-42 h-42">
            <AvatarImage src={user?.user?.avatar} />
          </Avatar>
        </div>
        <Form {...form}>
          <div className="mb-10 text-center">
            <h1 className="font-bold text-2xl md:text-3xl">Update profile</h1>
          </div>
          <div className="my-5">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* // ? name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="p-5"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* // ? email field */}
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
              {/* // ? bio field */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        className="p-5"
                        placeholder="Enter your bio..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* //? password field */}
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
                Save changes
              </Button>
            </form>
          </div>
          {/* <div className="flex items-center justify-center gap-2 mt-5">
            <p>Don't have an account</p>
            <span className="text-blue-600 hover:underline">
              <Link to="/">Signup</Link>
            </span>
          </div> */}
        </Form>
      </CardContent>
    </Card>
  );
}

export default Profile;
