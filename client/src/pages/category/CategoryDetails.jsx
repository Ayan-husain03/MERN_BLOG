import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import handleDelete from "@/helper/handleDelete";
import { AddCategoryRoute, EditCategoryRoute } from "@/helper/RouteName";
import useFetch from "@/hooks/useFetch";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router";

function CategoryDetails() {
  const [isDel, setIsDel] = useState(false);
  // * fetching all category from useFetch hook
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/category/all`,
    {
      method: "get",
      credentials: "include",
    },
    [isDel]
  );
  // ? delete function to delete category
  async function deleteCategory(id) {
    const del = await handleDelete(
      `${import.meta.env.VITE_API_BASE_URL}/category/delete/${id}`
    );
    if (del) {
      setIsDel(!isDel);
    }
  }
  return (
    <div>
      {loading && <Loading />}
      <Card>
        <CardHeader>
          <Button className={"cursor-pointer w-32"}>
            <Link
              to={AddCategoryRoute}
              className="flex justify-center items-center"
            >
              <Plus />
              Add Category
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>All Categories</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data?.data.length > 0 ? (
                <>
                  {data?.data?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.slug}</TableCell>
                      <TableCell className={"space-x-3"}>
                        <Button asChild variant={"blue"}>
                          <Link to={EditCategoryRoute(item._id)}>
                            <Edit />
                          </Link>
                        </Button>
                        <Button
                          variant={"destructive"}
                          onClick={() => deleteCategory(item._id)}
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell className={"text-center"} colSpan={3}>
                      No category added
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoryDetails;
