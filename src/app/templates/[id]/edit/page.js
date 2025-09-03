'use client';
import { use } from 'react';
import TemplateEditPage from '../../../../components/pages/templates/TemplateEditPage';
import ComponentErrorBoundary from '../../../../components/ui/ComponentErrorBoundary';

export default function TemplateEdit({ params }) {
    const resolvedParams = use(params);
    return (
        <ComponentErrorBoundary>
            <TemplateEditPage templateId={resolvedParams.id} />
        </ComponentErrorBoundary>
    );
}
