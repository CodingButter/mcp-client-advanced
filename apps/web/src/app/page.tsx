import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import MCPDashboard from '@/app/components/MCPDashboard';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <MCPDashboard />
      </main>
      <Footer />
    </div>
  );
}
