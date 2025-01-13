import { useLocation } from "@tanstack/react-router";

interface UseSidebarContentProps {
  childRoutes?: RegExp[];
  url?: string;
}
export function useSidebarContent({ url, childRoutes } : UseSidebarContentProps) {
  const location = useLocation();
  let isExternalLink = false;
  
  const isSelected = location.pathname === url;
  let orHasChild = false;
  
  if (childRoutes) {
    orHasChild = !!childRoutes.find((regex) => regex.test(location.pathname));
  }
  
  if (url) {
    isExternalLink = /(http(s?)):\/\//i.test(url);
  }

  return {
    isExternalLink,
    isActive: isSelected || orHasChild
  };
}