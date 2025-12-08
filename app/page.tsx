import BodyContent from "./components/BodyContent";
import { getHomeDataV2, getSocialLinksV2, getProjectsV2 } from "./requests/requests";
import { FeaturedProjects } from "./components/FeaturedProjects";

export default async function Home() {

  const homeData = await getHomeDataV2();
  const socialLinks = await getSocialLinksV2();
  const projects = await getProjectsV2();
  
  return (
    <>
      <BodyContent homeData={homeData} socialLinks={socialLinks}  />
      {/* Featured Projects - Minimal */}
      <FeaturedProjects projects={projects || []} />
    </>
  );
}
