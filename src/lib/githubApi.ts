import axios from 'axios';
import { GithubContributor } from '@/types/github';

export const CLIENT_WEBSITE_REPO = 'djangocameroon/website-v2';
export const SERVER_WEBSITE_REPO = 'djangocameroon/website_api';

class GithubApiService {
  // Calls the public GitHub REST API directly — no auth needed for a public repo's contributor list.
  async getWebsiteContributors(): Promise<GithubContributor[]> {

    const frontendContributorsRequest = await axios.get<GithubContributor[]>(
      `https://api.github.com/repos/${CLIENT_WEBSITE_REPO}/contributors`,
      { params: { per_page: 100 } }
    );

    const backendContributorsRequest = await axios.get<GithubContributor[]>(
      `https://api.github.com/repos/${SERVER_WEBSITE_REPO}/contributors`,
      { params: { per_page: 100 } }
    );
    const [{ data: frontendContributors }, { data: backendContributors }] = await Promise.all([frontendContributorsRequest, backendContributorsRequest]);

    const contributorsByLogin = new Map<string, GithubContributor>();
    for (const contributor of [...frontendContributors, ...backendContributors]) {
      if (contributor.type !== 'User') continue;

      const existing = contributorsByLogin.get(contributor.login);
      if (existing) {
        existing.contributions += contributor.contributions;
      } else {
        contributorsByLogin.set(contributor.login, { ...contributor });
      }
    }

    return Array.from(contributorsByLogin.values());
  }
}

export const githubApi = new GithubApiService();
