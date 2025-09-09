import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
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
import { Link, useNavigate, useParams } from "react-router";
import {
  AddCategoryRoute,
  CategoryDetailsRoute,
  LoginRoute,
} from "@/helper/RouteName";
import { Loader2 } from "lucide-react";
import { AlertPop } from "@/helper/Alert";
import { Eye } from "lucide-react";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/Loading";

function EditCategory() {
  const navigate = useNavigate();
  const { cat_id } = useParams();
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/category/get/${cat_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [cat_id]
  );
  const formSchema = z.object({
    name: z
      .string()
      .min(4, { message: "name must be at least 4 charactor long" }),
    slug: z
      .string()
      .min(4, { message: "name must be at least 4 charactor long" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  // // function to slugify text value

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }
  useEffect(() => {
    const categoryName = form.watch("name");
    if (categoryName) {
      const slug = slugify(categoryName);
      form.setValue("slug", slug);
    }
  }, [form.watch("name")]);
  useEffect(() => {
    if (data && data.data) {
      form.reset({
        name: data?.data?.name,
        slug: data?.data?.slug,
      });
    }
  }, [data]);
  const onSubmit = async (values) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/category/update/${cat_id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        AlertPop("error", "Cannot update category something wrong");
      }
      navigate(CategoryDetailsRoute);
      AlertPop("success", data.message || "Category updated successfully");
    } catch (error) {
      console.log("Error updating Category something wrong :", error);
      AlertPop("error", "Something went wrong");
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <Card className="max-w-screen-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="my-5">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        className="p-5"
                        placeholder="Enter your slug"
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
                    <Loader2 className="animate-spin" />
                    updating
                  </>
                ) : (
                  "Update"
                )}
                {/*  */}
              </Button>
            </form>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default EditCategory;
