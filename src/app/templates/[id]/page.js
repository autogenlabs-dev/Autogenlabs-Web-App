import TemplateDetailPage from '../../../components/pages/templates/TemplateDetailPage';

export default async function TemplateDetail({ params }) {
    const resolvedParams = await params;
    return <TemplateDetailPage templateId={resolvedParams.id} />;
}
