export const getOwnerAndRepo = (url: string) => {
  const owner = url.split("/").slice(-2, -1).join();
  const repo = url.split("/").slice(-1).join();

  return { owner, repo };
};
