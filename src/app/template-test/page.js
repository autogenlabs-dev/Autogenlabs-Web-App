// Disable prerendering for this test page
export const dynamic = 'force-dynamic';

export default function TemplateTestPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Template Test</h1>
      <p className="mb-4">This is a test page for templates.</p>
      <p className="text-gray-400">Page is working correctly.</p>
    </div>
  );
}

