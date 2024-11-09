interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="bg-background p-4 w-full h-full max-h-full font-body">
      {children}
    </main>
  );
}