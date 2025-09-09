// src/hooks/useInfrastructure.ts
import { useState, useEffect } from 'react';

interface InfrastructureData {
  success: boolean;
  count: number;
  error?: string | null;
  type?: string;
}

interface UseInfrastructureResult {
  count: number;
  loading: boolean;
  error: string;
}

export function useInfrastructure(type: string, initialData?: InfrastructureData): UseInfrastructureResult {
  const [count, setCount] = useState(initialData?.count || 0);
  const [loading, setLoading] = useState(!initialData?.success);
  const [error, setError] = useState(initialData?.error || '');

  useEffect(() => {
    // Si on a déjà des données initiales valides, ne pas refetch
    if (initialData?.success) {
      return;
    }

    // Sinon, fetch côté client en fallback
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/infrastructure/${type}`);
        const data: InfrastructureData = await response.json();
        
        if (data.success) {
          setCount(data.count);
          setError('');
        } else {
          setError(data.error || 'Erreur inconnue');
        }
      } catch (err) {
        console.error(`Erreur lors du fetch de ${type}:`, err);
        setError(`Impossible de récupérer le nombre de ${type}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, initialData]);

  return { count, loading, error };
}