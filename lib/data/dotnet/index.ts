import { Language } from "../types";
import { aspnetCategory } from "./aspnet";
import { efcoreCategory } from "./efcore";

export const dotnetLanguage: Language = {
  id: "dotnet",
  name: ".NET",
  type: "framework",
  icon: "🟣",
  image: "/picture/dotnet.png",
  color: "purple",
  description: "แพลตฟอร์มการพัฒนาซอฟต์แวร์จาก Microsoft",
  categories: [aspnetCategory, efcoreCategory],
};
