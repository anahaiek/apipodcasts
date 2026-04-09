import fs from "fs"
import path from "path"
import type { PodcastModel } from "../models/podcast-model.js";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcast = async ( podcastName?:string): Promise<PodcastModel[]> => {
    const data = fs.readFileSync(pathData, "utf-8");
   let jsonFile =JSON.parse(data);

    if(podcastName){
        jsonFile = jsonFile.filter(
            (podcast: PodcastModel) => podcast.podcastName === podcastName
        );
    }
    return jsonFile;
}