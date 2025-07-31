import { MutationOptions, QueryKey, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const MutationFactory = (
  mutationKey: QueryKey,
  url: string,
  method: "POST" | "PUT" | "PATCH",
  options?: MutationOptions,
) => {
  return useMutation<any, AxiosError, any>({
    mutationKey,
    mutationFn: async (variables: { body: any }) => {
      console.log("🚀 Making API request:");
      console.log("  - URL:", url);
      console.log("  - Method:", method);
      console.log("  - Body:", variables.body);
      
      try {
        const response = await axios({
          url,
          method,
          data: variables.body,
        });
        console.log("✅ API response received:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ API request failed:", error);
        throw error;
      }
    },
    ...options,
  });
};

export const useGenerateRoadmap = (
  query: string,
  model: string,
  modelApiKey: string | null,
  options?: MutationOptions,
) => {
  // Only include apiKey parameter if it's provided
  const apiKeyParam = modelApiKey && modelApiKey.trim() !== "" ? `?apiKey=${modelApiKey}` : "";
  const fullUrl = `/api/v1/${model}/roadmap${apiKeyParam}`;
  
  console.log("🔧 Creating roadmap mutation:");
  console.log("  - Query:", query);
  console.log("  - Model:", model);
  console.log("  - API Key provided:", !!modelApiKey);
  console.log("  - Full URL:", fullUrl);
  
  return MutationFactory(
    ["Generate Roadmap", query],
    fullUrl,
    "POST",
    options,
  );
};

export const useSearch = (query: string, options?: MutationOptions) => {
  return MutationFactory(
    ["Search Roadmap", query],
    `/api/v1/roadmaps`,
    "POST",
    options,
  );
};
