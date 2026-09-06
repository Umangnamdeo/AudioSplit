export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider?: 'email';
}

export interface StemTrack {
  id: string;
  name: string;
  url: string;
  volume: number;
  isMuted: boolean;
  isSolo: boolean;
}
