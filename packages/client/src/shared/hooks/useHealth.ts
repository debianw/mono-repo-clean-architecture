import { apiGet } from "client/src/shared/services/api"

export const useHealth = () => {
  const checkHealth = async () => {
    const response = await apiGet<{ running: 'ok' | 'fail' }>('/api/health')
    return response.data
  }

  return {
    checkHealth,
  }
}