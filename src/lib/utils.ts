import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'SUCCESS':
      return 'text-green-500 bg-green-500/10'
    case 'FAILED':
      return 'text-red-500 bg-red-500/10'
    case 'BUILDING':
    case 'DEPLOYING':
      return 'text-yellow-500 bg-yellow-500/10'
    case 'PENDING':
      return 'text-blue-500 bg-blue-500/10'
    case 'CANCELLED':
    case 'ROLLED_BACK':
      return 'text-gray-500 bg-gray-500/10'
    default:
      return 'text-gray-500 bg-gray-500/10'
  }
}

export function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'VERCEL':
      return '▲'
    case 'RENDER':
      return '◉'
    case 'RAILWAY':
      return '🚂'
    default:
      return '●'
  }
}
