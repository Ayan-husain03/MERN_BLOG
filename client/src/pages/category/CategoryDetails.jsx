import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddCategoryRoute } from "@/helper/RouteName";
import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function CategoryDetails() {
  return (
    <div>
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
                  
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoryDetails;
