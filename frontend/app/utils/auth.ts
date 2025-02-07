export const publicRoutes = ['/auth/login', '/auth/register'];

export const isPublicRoute = (pathname: string) => {
  return publicRoutes.includes(pathname);
};

export const isAuthRoute = (pathname: string) => {
  return pathname.startsWith('/auth/');
};