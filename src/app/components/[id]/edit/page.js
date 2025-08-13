'use client';
import { use } from 'react';
import ComponentEditPage from '@/components/pages/components/ComponentEditPage';
import ComponentErrorBoundary from '@/components/ui/ComponentErrorBoundary';

export default function ComponentEdit({ params }) {
    const resolvedParams = use(params);
    return (
        <ComponentErrorBoundary>
            <ComponentEditPage componentId={resolvedParams.id} />
        </ComponentErrorBoundary>
    );
}
