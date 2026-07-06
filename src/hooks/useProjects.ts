"use client";

import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/lib/projectsApi';
import { queryKeys } from '@/lib/query-keys';

export const useProjects = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: queryKeys.projects(),
    queryFn: () => projectsApi.getAllProjects(),
  });

  return {
    projects: data ?? [],
    loading: isPending,
    error: error ? (error as Error).message || 'Failed to fetch projects' : null,
    refetch,
  };
};
