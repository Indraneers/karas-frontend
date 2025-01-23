import { getImageUrl } from "@/lib/image";

export function Logo({ img, className }: { img?: string, className?: string }) {
  return (
    <div>
      <img className={className} src={img ? getImageUrl(img) : '/logo.png'} alt="Logo" />
    </div>
  );
}