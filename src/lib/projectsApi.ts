import { AxiosInstance } from 'axios';
import axiosClient from '@/apis/axios';
import { ProjectItem, ProjectListResponse } from '@/types/project';

class ProjectsApiService {
  private api: AxiosInstance = axiosClient;

  // GET /projects/ — public, published projects only, featured first
  async getAllProjects(): Promise<ProjectItem[]> {
    const { data } = await this.api.get<ProjectListResponse>('/projects/');
    return data.data;
  }
}

export const projectsApi = new ProjectsApiService();
