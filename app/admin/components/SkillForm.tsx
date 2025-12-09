"use client";

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SkillFormProps = {
  initialData?: Partial<SkillFormData>;
  onSubmit: (data: SkillFormData) => void;
};

const skillFormDataSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'], { required_error: "Proficiency is required" }),
});

export type SkillFormData = z.infer<typeof skillFormDataSchema>;

export type SkillFormRef = {
    submitForm: () => Promise<void>;
};

const SkillForm = forwardRef<
  SkillFormRef,
  SkillFormProps
>(({ initialData, onSubmit }, ref) => {
  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillFormDataSchema),
    defaultValues: {
      name: "",
      category: "",
      proficiency: undefined,
      id: undefined,
    },
  });

  const { handleSubmit, trigger, control, reset, formState: { isValid, isSubmitting, errors }, getValues } = form;

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      trigger();
    }
  }, [initialData, reset, trigger]);

  const onSubmitHandler: SubmitHandler<SkillFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Skill Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Frontend, Backend, DevOps" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="proficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proficiency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select proficiency level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {initialData?.id ? "Update Skill" : "Create Skill"}
        </Button>
      </form>
    </Form>
  );
});

SkillForm.displayName = "SkillForm";

export default SkillForm;
