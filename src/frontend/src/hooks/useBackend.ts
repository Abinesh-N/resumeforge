import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  CreatePaymentInput,
  CreateResumeInput,
  PaymentId,
  PaymentRecordView,
  ProfileView,
  ResumeId,
  ResumeView,
  ShoppingItem,
  StripeConfiguration,
  StripeSessionStatus,
  Template,
  UpdateResumeInput,
} from "../types";
import type { CheckoutSession } from "../types";

export function useGetMyProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const query = useQuery<ProfileView | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getMyProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetMyResumes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ResumeView[]>({
    queryKey: ["myResumes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyResumes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTemplates() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Template[]>({
    queryKey: ["templates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTemplates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetResume(resumeId: ResumeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ResumeView | null>({
    queryKey: ["resume", resumeId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getResume(resumeId);
    },
    enabled: !!actor && !isFetching && !!resumeId,
  });
}

export function useCreateResume() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateResumeInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createResume(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myResumes"] });
    },
  });
}

export function useUpdateResume() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateResumeInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateResume(input);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myResumes"] });
      queryClient.invalidateQueries({ queryKey: ["resume", data.id] });
    },
  });
}

export function useDeleteResume() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId: ResumeId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteResume(resumeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myResumes"] });
    },
  });
}

export function useCreatePaymentRecord() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePaymentInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPaymentRecord(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentHistory"] });
    },
  });
}

export function useConfirmPayment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paymentId: PaymentId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.confirmPayment(paymentId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["paymentHistory"] });
      queryClient.invalidateQueries({ queryKey: ["resume", data.resumeId] });
      queryClient.invalidateQueries({ queryKey: ["myResumes"] });
    },
  });
}

export function useGetPaymentHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PaymentRecordView[]>({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPaymentHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stripeConfigured"] });
    },
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (items: ShoppingItem[]): Promise<CheckoutSession> => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      const result = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl,
      );
      const session = JSON.parse(result) as CheckoutSession;
      if (!session?.url) throw new Error("Stripe session missing url");
      return session;
    },
  });
}

export function useGetStripeSessionStatus() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (sessionId: string): Promise<StripeSessionStatus> => {
      if (!actor) throw new Error("Actor not available");
      return actor.getStripeSessionStatus(sessionId);
    },
  });
}

export function useUpdateMyProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      email,
      name,
    }: {
      email: string | null;
      name: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateMyProfile(email, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}
