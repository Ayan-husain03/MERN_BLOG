import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";
import { AlertPop } from "@/helper/Alert";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function Updatepassword() {
  const user = useSelector((state) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  // * form schema
  const formSchema = z.object({
    oldPassword: z
      .string()
      .min(6, { message: "password must be 6 character long" }),
    newPassword: z
      .string()
      .min(6, { message: "new password must be 6 character long" }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });
  const onsubmit = async (values) => {
    try {
      setIsUpdating(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/update-password/${
          user?.user?._id
        }`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        return AlertPop("error", "Response is not ok");
      }
      AlertPop("success", result.message || "password has been updated");
      form.reset();
    } catch (error) {
      console.error("Error updating pass : ", error);
      AlertPop("error", error.message || "Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={"absolute text-blue-600 right-0 top-0 cursor-pointer"}
          variant={"ghost"}
        >
          change password <PenBox />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OldPassword</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="p-5"
                      placeholder="Enter your old password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="p-5"
                      placeholder="Enter your new Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button
                disabled={isUpdating}
                className="flex items-center gap-2"
                type="submit"
                variant={"outline"}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default Updatepassword;
