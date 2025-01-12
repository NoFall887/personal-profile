import React, { ReactNode, useState } from "react";
import {
    Controller,
    ControllerProps,
    FieldValues,
    FieldPath,
    UseFormSetValue,
    PathValue,
} from "react-hook-form";
import {
    FormControl,
    FormFieldContext,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { IoClose } from "react-icons/io5";
const Tags = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    children,
    className,
    setVal,
    name,
    index,
    fieldValues,
}: {
    children: ReactNode;
    className?: string;
    setVal: UseFormSetValue<TFieldValues>;
    name: any;
    index: number;
    fieldValues: PathValue<TFieldValues, TName>;
}) => {
    return (
        <div
            className={cn(
                "p-1 pl-2 bg-slate-950 rounded flex items-center space-x-1 text-sm",
                className
            )}
        >
            <span>{children}</span>
            <button className="w-4 h-4">
                <IoClose
                    className="w-full"
                    onClick={(e) => {
                        e.preventDefault();
                        fieldValues.splice(index, 1);
                        setVal(name, fieldValues);
                    }}
                />
            </button>
        </div>
    );
};

const TagsInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    setVal,
    ...props
}: { setVal: UseFormSetValue<TFieldValues> } & Omit<
    ControllerProps<TFieldValues, TName>,
    "render"
>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller
                {...props}
                render={({ field }) => {
                    return (
                        <FormItem>
                            <FormLabel>Techs</FormLabel>
                            <div className="rounded-md p-2 flex flex-wrap gap-2 bg-slate-900">
                                <FormControl>
                                    <Input
                                        className="hidden"
                                        placeholder="Tags"
                                        {...field}
                                    />
                                </FormControl>
                                {field.value.map((item: any, index: number) => (
                                    <Tags
                                        key={index}
                                        setVal={setVal}
                                        name={props.name}
                                        index={index}
                                        fieldValues={field.value}
                                    >
                                        {item}
                                    </Tags>
                                ))}
                                <input
                                    type="text"
                                    placeholder="Tags"
                                    className="bg-transparent text-sm focus:outline-none"
                                    onKeyDown={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            setVal(
                                                props.name,
                                                field.value.concat(target.value)
                                            );
                                            target.value = "";
                                        }
                                    }}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />
        </FormFieldContext.Provider>
    );
};

export default TagsInput;
