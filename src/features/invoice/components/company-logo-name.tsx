import { Logo } from "@/components/logo";
import { AppConfig } from "@/features/app-config/types/app-config";

export function CompanyLogoName({ config } : { config: AppConfig }) {
  return (
    <div>
      <Logo img={config.logo} className="h-10" />
      <h2 className="font-bold text-2xl">{config.branchNameEn}</h2>
      <h2 className="font-display text-xs">{config.branchNameKh}</h2>
    </div>
  );
}