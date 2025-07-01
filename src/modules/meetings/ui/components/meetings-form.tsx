"use client";

import React from "react";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { LoadingIcon } from "@/components/icons";
import { meetingsInsertSchema } from "@/modules/meetings/utils/schemas";
import { MeetingGetOne } from "@/modules/meetings/utils/types";
import CommandSelect from "@/components/ui/command-select";
import CustomAvatar from "@/components/custom/custom-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/agents-dialogs";

interface MeetingFormProps {
  onSuccess: (id?: string) => void;
  onCancel: () => void;
  initialValues?: MeetingGetOne;
}

export default function MeetingForm({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [agentSearch, setAgentSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id }),
          );
        }
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name || "",
      agentId: initialValues?.agentId || "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  function onSubmit(values: z.infer<typeof meetingsInsertSchema>) {
    if (isEdit && initialValues?.id) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  }

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <CustomAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Select an Agent"
                  />
                </FormControl>
                <FormDescription>
                  Didn&apos;t find what you&apos;re looking for? Create a{" "}
                  <Button
                    onClick={() => setOpen(true)}
                    variant="link"
                    type="button"
                    className="m-0 p-0"
                  >
                    new agent.
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              className="rounded-full border font-semibold tracking-wide uppercase"
              size="sm"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              className="rounded-full border font-semibold tracking-wide uppercase"
              size="sm"
              type="submit"
            >
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
    </>
  );
}
