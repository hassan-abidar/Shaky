"use client";
import axios from "axios";
import { cn } from "@/lib/utils";
import * as z from "zod";
import React from "react";
import { Heading } from "@/components/heading";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

const DeveloperPage = () => {
  const router = useRouter();
  const [messages , setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const userMessage: ChatCompletionRequestMessage={
        role:"user",
        content:values.prompt,
      };
      const newMessages=[...messages,userMessage];
      const response=await axios.post("/api/chat-with-dev",{
        messages:newMessages,
      });
      setMessages((current)=> [...current,userMessage,response.data]);
      form.reset();

    } catch (error:any){
        console.log(error);
    } finally{
        router.refresh();

    }
    
  };

  return (
    <div>
      <Heading
        title="Chat with the dev"
        description="You can ask whatever you want the dev of this platform"
        icon={User}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
        <Form {...form}>
        <form
  onSubmit={form.handleSubmit(onSubmit)}
  className="
    rounded-lg
    border 
    w-full
    p-4
    px-3
    md:px-6
    focus-within:shadow-sm
    flex
    justify-between
  "
>
  <FormField
    name="prompt"
    render={({ field }) => (
      <FormItem className="flex-grow">
        <FormControl className="m-0 p-0">
          <Input 
            className="border-0 outline-none focus-visible:ring-O focus-visible:ring-transparent w-full" // Set width to 'full'
            disabled={isLoading}
            placeholder="What is your name ?"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
  <Button className="" disabled={isLoading}>
    Generate
  </Button>
</form>


</Form>

        </div>
        <div className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center
              justify-center bg-muted">
                  <Loader />
              </div>
            )}
            {messages.length==0 && !isLoading && (
              <div>
                <Empty label="No conversation until now ! " />
              </div>
            )}
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message)=>
              <div 
              key={message.content}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role==="user" ? "bg-white border border-black/10 " : "bg-muted"
                )}
              >   
              {message.role==="user" ? <UserAvatar/> : <BotAvatar/>}
                  <p className="text-sm">
                  {message.content}
                  </p>
              </div>
              )}

            </div>
        </div>

      </div>
    </div>
  );
};

export default DeveloperPage;
