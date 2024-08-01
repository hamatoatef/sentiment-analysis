import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnalysis } from "../services/apiAnalusis";

export function useAnalysis() {
  const queryClient = useQueryClient();

  const {
    mutate: analysis,
    isPending: isAnalysis,
    data,
  } = useMutation({
    mutationFn: getAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analysis"] });
    },
  });

  return { isAnalysis, analysis, data };
}
