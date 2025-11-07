"use client";
import React  from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { Form } from "@/components/ui/form";
import { SearchTermSchema } from "@/lib/schemas";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";

const PathnameDisplay = () => {
  const form = useForm<z.infer<typeof SearchTermSchema>>({
    resolver: zodResolver(SearchTermSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SearchTermSchema>) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="searchTerm"
            placeholder="Search..."
            variant="h-[40px] w-full"
            rightIcon={<Search className="cursor-pointer" />}
          />
        </form>
      </Form>
    </div>
  );
};

export default PathnameDisplay;
