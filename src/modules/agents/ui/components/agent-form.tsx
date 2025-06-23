"use client";

import { useRouter } from "next/navigation";

import React from "react";

import { AgentGetOne } from "@/modules/agents/utils/types";
import { agentsInsertSchema } from "@/modules/agents/utils/schemas";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomAvatar from "@/components/custom/custom-avatar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { LoadingIcon } from "@/components/icons";

interface AgentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialValues?: AgentGetOne;
}

export default function AgentForm({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name || "",
      instructions: initialValues?.instructions || "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  function onSubmit(values: z.infer<typeof agentsInsertSchema>) {
    if (isEdit) {
      console.log("edit agent");
    } else {
      createAgent.mutate(values);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <CustomAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="size-12"
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea className="resize-none" rows={8} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            disabled={isPending}
            type="button"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <LoadingIcon className="animate-spin" />
            ) : isEdit ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
