import { AnimatedTooltip } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Tanmay Agrawal",
    designation: "@tanmayagrwl",
    image:
      "https://avatars.githubusercontent.com/u/86347805?v=4",
  },
  {
    id: 2,
    name: "Jatin Kumar",
    designation: "@jatindotdev",
    image:
      "https://avatars.githubusercontent.com/u/59236972?v=4",
  },
  {
    id: 3,
    name: "Aryan Raj",
    designation: "@aryanraj2713",
    image:
      "https://avatars.githubusercontent.com/u/75358720?v=4",
  },
  {
    id: 4,
    name: "Akshit Ohri",
    designation: "@dwe-cloud",
    image:
      "https://media.licdn.com/dms/image/D4E03AQEgWSCmT8Ld4A/profile-displayphoto-shrink_400_400/0/1692106412226?e=1712793600&v=beta&t=YVp-RSm_AXP0oB5qgJHP3sulK2IojG2ClNIf_RdZQKs",
  },
  
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
