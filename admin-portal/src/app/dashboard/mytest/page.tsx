"use client";
import { FormProvider, useForm } from "react-hook-form";
import TestInput from "@/components/ui/form/TestInput";
export interface AddNewTopic {
  title: string;
  description: string;
}

export default function page() {
 const methods = useForm<AddNewTopic>({
   mode: "onBlur", 
  defaultValues:{
    title:"",
    description:"",
  }
 }
 );

  const onSubmit = async (data: AddNewTopic) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TestInput name="title" label="title"/>
        <TestInput name="description" label="description"/>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
