import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validateRequest } from "@/lib/auth";
import React from "react";

import { z } from "zod";
import CreateBlogForm from "./forms";

const CreateBlogPage = () => {
  return <CreateBlogForm />;
};

export default CreateBlogPage;
