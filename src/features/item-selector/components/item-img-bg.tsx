export function ItemImgBg({
  src
} :  { src: string }) {
  return (
    <div className="absolute inset-0">
      <img 
        className="group-hover:blur-[1px] group-hover:brightness-75 object-cover transition-all duration-300" 
        src={src} 
        loading="lazy" 
      />
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
    </div>
  );
}