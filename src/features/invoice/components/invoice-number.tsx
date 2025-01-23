export function InvoiceNumber({ id }: { id: string }) {
  return (
    <div className="border-foreground p-1 border rounded-md text-sm">
      <h3 className="font-bold">Invoice N.O</h3>
      <div className="font-medium"># {id}</div>
    </div>
  );
}