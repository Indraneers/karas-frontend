import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { getAuditById } from "@/features/audit/api/audit";
import { AuditInfo } from "@/features/audit/components/audit-info";
import { useQuery } from "@tanstack/react-query";
import { Differ, Viewer } from "json-diff-kit";
import "json-diff-kit/dist/viewer.css";

import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
  "/_protected_layout/_dashboard_layout/audit/$auditId",
)({
  component: () => <AuditDetailPage />,
});

export function AuditDetailPage() {
  const { auditId } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["audit", auditId],
    queryFn: () => getAuditById(auditId),
  });

  const oldData = data?.oldValue ? JSON.parse(data.oldValue) : null;
  const newData = data?.newValue ? JSON.parse(data.newValue) : null;

  const differ = new Differ({
    detectCircular: true,
    maxDepth: Infinity,
    showModifications: true,
    arrayDiffMethod: "lcs",
  });

  const diff = differ.diff(oldData, newData);

  const copyToClipboard = (obj: any) => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Card className="p-2">
        <CardHeader>
          <TypographyH2>Audit Detail</TypographyH2>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-3 mt-4">
          <AuditInfo label="Name">{data?.name || "-"}</AuditInfo>
          <AuditInfo label="Resource Name">
            {data?.resourceName || "-"}
          </AuditInfo>
          <AuditInfo label="Service">{data?.service || "-"}</AuditInfo>
          <AuditInfo label="Service">{data?.requestUrl || "-"}</AuditInfo>
          <AuditInfo label="Http Method">{data?.httpMethod || "-"}</AuditInfo>
          <AuditInfo label="User">{data?.user.username || "-"}</AuditInfo>
          <AuditInfo label="Timestamp">
            {data ? format(data?.timestamp, "do MMM yyyy, hh:mm aa") : "-"}
          </AuditInfo>
        </CardContent>
      </Card>
      <Card className="p-2 grow">
        <CardHeader>
          <TypographyH2>Data Comparison</TypographyH2>
        </CardHeader>
        <CardContent>
          {!isLoading && (
            <div className="flex justify-between mb-2">
              <Button onClick={() => copyToClipboard(oldData)}>
                Copy Old Data
              </Button>
              <Button onClick={() => copyToClipboard(newData)}>
                Copy New Data
              </Button>
            </div>
          )}
          {isLoading ? (
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6"></Skeleton>
              <Skeleton className="h-6"></Skeleton>
              <Skeleton className="h-6"></Skeleton>
              <Skeleton className="h-6"></Skeleton>
              <Skeleton className="h-6"></Skeleton>
              <Skeleton className="h-6"></Skeleton>
            </div>
          ) : (
            <Viewer
              diff={diff}
              indent={2}
              lineNumbers={true}
              highlightInlineDiff={true}
              inlineDiffOptions={{
                mode: "word",
                wordSeparator: " ",
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
