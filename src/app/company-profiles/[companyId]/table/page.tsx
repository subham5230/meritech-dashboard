import { CompanyProfileTable } from "@/components/company-profiles";

interface TablePageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function TablePage({ params }: TablePageProps) {
  const { companyId } = await params;

  return (
    <div className="space-y-6">
      <CompanyProfileTable companyId={companyId} />
    </div>
  );
}
