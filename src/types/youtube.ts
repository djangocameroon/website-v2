export interface YoutubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  views: number;
  likes: number;
  tags: string[];
}

export interface YoutubeVideosResponse {
  status: boolean;
  message?: string;
  videos?: YoutubeVideo[];
}
