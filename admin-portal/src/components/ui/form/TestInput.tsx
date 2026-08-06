"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
interface inputType {
  name: string;
  label: string;
}
export default function TestInput({ name, label }: inputType) {
  const { register,watch,formState:{errors,touchedFields} } = useFormContext();
  return (
    <>
      <input
        {...register(name,{
            required:`${label} is required`
        })}
        placeholder={label}
        className="border border-gray-200 rounded-md"
      />
      {
       touchedFields[name] && errors[name] && (
            <p className="text-red-500 text-xs">
                {String(errors[name]?.message)}
            </p>
        )
      }
    </>
  );
}
