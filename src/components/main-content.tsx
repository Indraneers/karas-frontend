interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="bg-background p-4 w-full h-screen max-h-screen">
      {children}
    </main>
  );
}