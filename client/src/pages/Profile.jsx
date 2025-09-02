import Loading from "@/components/Loading";
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
import { AlertPop } from "@/helper/Alert";
import useFetch from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenBox } from "lucide-react";
import { Camera } from "lucide-react";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { z } from "zod";

function Profile() {
  const [avatarPreview, setAvatarPreview] = useState("");
  const [file, setFile] = useState([]);
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/get-user/${user?.user?._id}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const formSchema = z.object({
    username: z.string().min(4, { message: "name must be 4 character long" }),
    email: z.string().email({ message: "Invalid email address" }),
    bio: z.string().min(4, { message: "bio must be 4 character long" }),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      password: "",
    },
  });
  // ? here we are adding values in form field which we are fetching from useFetch()
  useEffect(() => {
    if (data && data.data) {
      form.reset({
        username: data?.data?.username,
        email: data?.data?.email,
        bio: data?.data?.bio ?? "",
      });
    }
  }, [data]);
  // ? form submit handler
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(values));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/update-user/${
          user?.user?._id
        }`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );
      const result = await response.json();
      console.log(result);
      if (!response.ok)
        return AlertPop("error", result.message || "failed to update user");
      AlertPop("success", result?.message || "User update successfully");
    } catch (error) {
      console.log("Error : ", error);
      AlertPop("error", error);
    }
  };

  // ? file dropzone handler
  const handleFiles = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    setFile(file);
  };
  if (loading) return <Loading />;
  return (
    <Card className="">
      <CardContent>
        <div className="flex justify-center items-center">
          <Dropzone onDrop={(acceptedFiles) => handleFiles(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-42 h-42 relative group  transition-all duration-300">
                  <AvatarImage
                    src={
                      avatarPreview
                        ? avatarPreview
                        : data?.data?.avatar || "/images/user.png"
                    }
                  />
                  <div className="bg-black/50 z-10 absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center opacity-0 items-center group-hover:opacity-100  transition-all duration-300 cursor-pointer">
                    <Camera size={40} className="text-white" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>
        <Form {...form}>
          <div className="mb-10 text-center flex items-center justify-center gap-2">
            <h1 className="font-extrabold text-2xl md:text-3xl">
              Update profile
            </h1>
            <PenBox />
          </div>
          <div className="my-5">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* // ? name field */}
              <FormField
                control={form.control}
                name="username"
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
        </Form>
      </CardContent>
    </Card>
  );
}

export default Profile;
