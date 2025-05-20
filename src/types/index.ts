
// Types communs
export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les actualités
export interface NewsCategory extends BaseModel {
  name: string;
  slug: string;
}

export interface News extends BaseModel {
  title: string;
  content: string;
  image?: string;
  categoryId: string;
  category?: NewsCategory;
}

// Types pour les podcasts
export interface PodcastPlaylist extends BaseModel {
  name: string;
  description?: string;
  coverImage?: string;
}

export interface Podcast extends BaseModel {
  title: string;
  description?: string;
  audioUrl: string;
  coverImage?: string;
  duration?: number;
  playlistId: string;
  playlist?: PodcastPlaylist;
}

// Types pour les replays
export interface ReplayPlaylist extends BaseModel {
  name: string;
  description?: string;
  coverImage?: string;
}

export interface Replay extends BaseModel {
  title: string;
  description?: string;
  audioUrl: string;
  coverImage?: string;
  duration?: number;
  airDate: string;
  playlistId: string;
  playlist?: ReplayPlaylist;
}

// Types pour les vidéos
export interface Video extends BaseModel {
  title: string;
  ytbUrl: string;
  thumbnailUrl?: string;
  description?: string;
}

// Types pour les statistiques
export interface ContentStats {
  name: string;
  count: number;
}

export interface MonthlyStats {
  month: string;
  views: number;
}

export interface UserEngagement {
  contentType: string;
  engagementRate: number;
}
