'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchJson, getErrorMessage } from '@/lib/admin/fetch-json';

interface AdminCollectionMessages {
    loadError: string;
    deleteConfirm: string;
    deleteSuccess: string;
    deleteError: string;
}

export function useAdminCollection<T extends { id: string }>(endpoint: string, messages: AdminCollectionMessages) {
    const { loadError, deleteConfirm, deleteSuccess, deleteError } = messages;
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchJson<T[]>(endpoint, { cache: 'no-store' });
            setItems(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            const message = getErrorMessage(err, loadError);
            setItems([]);
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [endpoint, loadError]);

    useEffect(() => {
        reload();
    }, [reload]);

    const remove = useCallback(async (id: string) => {
        if (!confirm(deleteConfirm)) return false;
        try {
            await fetchJson(`${endpoint}/${id}`, { method: 'DELETE' });
            setItems(prev => prev.filter(item => item.id !== id));
            toast.success(deleteSuccess);
            return true;
        } catch (err) {
            toast.error(getErrorMessage(err, deleteError));
            return false;
        }
    }, [endpoint, deleteConfirm, deleteSuccess, deleteError]);

    return { items, setItems, loading, error, reload, remove };
}
