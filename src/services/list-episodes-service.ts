import { repositoryPodcast } from "../repositories/podcasts-repository.js";

export const serviceListEpisodes = async () => {
   const data = await repositoryPodcast();

    return data;
}