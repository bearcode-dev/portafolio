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
import CustomDatePicker from "./DatePicker";
import { z } from "zod";

type AddExperienceProps = {
  initialData?: Partial<ExperienceFormData>;
  onSubmit: (data: ExperienceFormData) => void;
};

const formDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  start: z.date().optional().nullable(),
  end: z.date().optional().nullable(), // Acepta cadenas de fecha o null
  image: z.string().optional(),
  id: z.string().optional(),
});

export type ExperienceFormData = z.infer<typeof formDataSchema>;

export type AddExperienceRef = {
    submitForm: () => Promise<void>;
};

const AddExperience = forwardRef<
  AddExperienceRef,
  AddExperienceProps
>(({ initialData, onSubmit }, ref) => {
  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(formDataSchema),
    // mode: "onBlur",
    defaultValues: {
      name: "",
      title: "",
      start: null,
      end: null,
      image: "",
      id: undefined,
    },
    //mode: 'onBlur',
  });

  const {
    handleSubmit,
    trigger,
    control,
    reset,
    formState: { isValid, isSubmitting, errors },
    getValues,
  } = form;

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  useEffect(() => {
    if (initialData) {
      const convertedData = {
        ...initialData,
        start: initialData.start ? new Date(initialData.start) : null,
        end: initialData.end ? new Date(initialData.end) : null,
      };
      reset(convertedData);
      trigger(); // Trigger validation after resetting the form
    }
  }, [initialData, reset, trigger]);

  useEffect(() => {
    console.log("Form Values:", getValues());
    console.log("Is Valid:", isValid);
    console.log("Errors:", errors);
    console.log("Form isSubmitting:");
  }, [isValid, errors, isSubmitting, getValues]);

  const onSubmitHandler: SubmitHandler<ExperienceFormData> = (data) => {
    console.log("onSubmitHandler:", data);

    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="start"
          render={({ field }) => (
            <CustomDatePicker
              value={field.value ?? null}
              onChange={field.onChange}
              label="Start Date"
            />
          )}
        />
        <FormField
          control={control}
          name="end"
          render={({ field }) => (
            <CustomDatePicker
              value={field.value ?? null}
              onChange={field.onChange}
              label="End Date"
            />
          )}
        />
        <Button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isSubmitting ? "opacity-50" : ""}`}
          disabled={!isValid || isSubmitting}
        >
          Save
        </Button>
      </form>
    </Form>
  );
});

export default AddExperience;
AddExperience.displayName = "AddExperience";
