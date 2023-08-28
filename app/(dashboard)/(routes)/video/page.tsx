"use client";
import axios from "axios";
import * as z from "zod";
import React from "react";
import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const VideoPage = () => {
  const proModal=useProModal();

  const router = useRouter();
  const [video , setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      setVideo(undefined);
      const response=await axios.post("/api/video",values);
      setVideo(response.data[0]);
      form.reset();

    } catch (error:any){
      if(error?.response?.status===403){
        proModal.onOpen();
    }
    else{
      toast.error("Something went wrong");
   }
    } finally{
        router.refresh();

    }
    
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your imaginations into video."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
            placeholder="Horse running around a farm."
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
            {!video  && !isLoading && (
              <div>
                <Empty label="No Video until now ! " />
              </div>
            )}
          {video && (
            <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
                  <source src={video} />
            </video>
          )}
        </div>

      </div>
    </div>
  );
};

export default VideoPage;
