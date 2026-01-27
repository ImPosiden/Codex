import StaffNavbar from '@/components/StaffNavbar';
import StaffSidebar from '@/components/StaffSidebar';

export const metadata = {
  title: 'Staff Portal - ServiceHub',
  description: 'ServiceHub Staff Management Portal',
};

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <StaffNavbar />
      <div className="flex flex-1 overflow-hidden">
        <StaffSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
