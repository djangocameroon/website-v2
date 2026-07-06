import axios from 'axios';
import { YoutubeVideo, YoutubeVideosResponse } from '@/types/youtube';

class YoutubeApiService {
  // Calls the internal /api/youtube route handler, which keeps the YouTube
  // Data API key server-side.
  async getChannelVideos(handle: string): Promise<YoutubeVideo[]> {
    const { data } = await axios.get<YoutubeVideosResponse>('/api/youtube', {
      params: { handle },
    });

    if (!data.status) {
      throw new Error(data.message ?? 'Failed to fetch YouTube videos');
    }

    return data.videos ?? [];
  }
}

export const youtubeApi = new YoutubeApiService();
