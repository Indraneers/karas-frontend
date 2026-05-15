import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected_layout/_dashboard_layout/maintenance/",
)({
  component: () => <MaintenancePage />,
});

function MaintenancePage() {
  return (
    <Section>
      <SectionHeader>
        <TypographyH1>Maintenance</TypographyH1>
        <p className="mt-1 text-sm text-muted-foreground">
          Scheduled and ongoing service maintenance.
        </p>
      </SectionHeader>
      <SectionContent>
        <p className="text-sm text-muted-foreground">Coming soon.</p>
      </SectionContent>
    </Section>
  );
}
