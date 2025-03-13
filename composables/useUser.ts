export const useUser = () => {
  const delay = (ms: number) => new Promise((res, rej) => setTimeout(res, ms));

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      await delay(1000);
      return $fetch("https://reqres.in/api/users/2");
    },
  });
  
};
