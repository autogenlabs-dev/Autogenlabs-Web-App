'use client';
import { use } from 'react';
import ComponentDetailPage from '../../../components/pages/components/ComponentDetailPage';
import ComponentErrorBoundary from '../../../components/ui/ComponentErrorBoundary';

export default function ComponentDetail({ params }) {
    const resolvedParams = use(params);
    return (
        <ComponentErrorBoundary>
            <ComponentDetailPage componentId={resolvedParams.id} />
        </ComponentErrorBoundary>
    );
}
