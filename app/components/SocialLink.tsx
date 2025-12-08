import Image from "next/image"
import { SocialLinkType } from "./types/types"

const SocialLink = ({item}:{item: SocialLinkType}) => (
  <a href={item.link} target="_blank" className="block w-full h-full flex items-center justify-center text-gray-700 dark:text-white" rel="noreferrer">
      <Image width="24" height="24" alt={item.name} src={item.icon} className="w-6 h-6 object-contain" />
  </a>
)

export default SocialLink;