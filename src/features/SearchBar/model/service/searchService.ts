import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CommunityWithCount } from '../types/search';

export const useSearch = (query: string) =>
  useQuery<CommunityWithCount[]>({
    queryFn: () => axios.get(`/api/search?q=${query}`),
    queryKey: ['search-query', !!query.trim()],
    enabled: !!query.trim().length
  });
