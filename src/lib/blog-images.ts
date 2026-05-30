import blackMulch from "@/assets/products/black-mulch.jpg";
import cedarMulch from "@/assets/products/cedar-mulch.jpg";
import crystalWhiteRock from "@/assets/products/crystal-white-rock.jpg";
import gardenMix from "@/assets/products/garden-mix.jpg";
import limestone from "@/assets/products/limestone.jpg";
import nuggetBark from "@/assets/products/nugget-bark.jpg";
import pineMulch from "@/assets/products/pine-mulch.jpg";
import playSand from "@/assets/products/play-sand.jpg";
import purpleSpark from "@/assets/products/purple-spark.jpg";
import radonRock from "@/assets/products/radon-rock.jpg";
import redMulch from "@/assets/products/red-mulch.jpg";
import roadCrush from "@/assets/products/road-crush.jpg";
import rundleRock from "@/assets/products/rundle-rock.jpg";
import topsoil from "@/assets/products/topsoil.jpg";
import washRock from "@/assets/products/wash-rock.jpg";
import blogHero from "@/assets/blog-hero.jpg";

const MAP: Record<string, string> = {
  "black-mulch.jpg": blackMulch,
  "cedar-mulch.jpg": cedarMulch,
  "crystal-white-rock.jpg": crystalWhiteRock,
  "garden-mix.jpg": gardenMix,
  "limestone.jpg": limestone,
  "nugget-bark.jpg": nuggetBark,
  "pine-mulch.jpg": pineMulch,
  "play-sand.jpg": playSand,
  "purple-spark.jpg": purpleSpark,
  "radon-rock.jpg": radonRock,
  "red-mulch.jpg": redMulch,
  "road-crush.jpg": roadCrush,
  "rundle-rock.jpg": rundleRock,
  "topsoil.jpg": topsoil,
  "wash-rock.jpg": washRock,
};

const FALLBACKS = [cedarMulch, rundleRock, topsoil, crystalWhiteRock];

export function blogCover(cover: string | null | undefined, index = 0): string {
  if (cover) {
    if (cover.startsWith("http") || cover.startsWith("/")) return cover;
    const file = cover.split("/").pop()!;
    if (MAP[file]) return MAP[file];
  }
  return FALLBACKS[index % FALLBACKS.length];
}

export { blogHero };