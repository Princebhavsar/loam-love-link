import blackMulch from "@/assets/products/black-mulch.jpg";
import cedarMulch from "@/assets/products/cedar-mulch.jpg";
import crystalWhite from "@/assets/products/crystal-white-rock.jpg";
import gardenMix from "@/assets/products/garden-mix.jpg";
import limestone from "@/assets/products/limestone.jpg";
import limestone2030 from "@/assets/products/limestone-20-30mm.png";
import majestic from "@/assets/products/majestic-midnight.jpg";
import majestic20 from "@/assets/products/majestic-midnight-20mm.png";
import majestic40 from "@/assets/products/majestic-midnight-40mm.png";
import majestic63 from "@/assets/products/majestic-midnight-63mm.png";
import nugget from "@/assets/products/nugget-bark.jpg";
import pine from "@/assets/products/pine-mulch.jpg";
import playSand from "@/assets/products/play-sand.jpg";
import purple from "@/assets/products/purple-spark.jpg";
import purple40 from "@/assets/products/purple-spark-40mm.png";
import radon from "@/assets/products/radon-rock.jpg";
import redMulch from "@/assets/products/red-mulch.jpg";
import roadCrush from "@/assets/products/road-crush.jpg";
import rundle from "@/assets/products/rundle-rock.jpg";
import rundle20 from "@/assets/products/rundle-rock-20mm.png";
import rundle40 from "@/assets/products/rundle-rock-40mm.png";
import rundle5090 from "@/assets/products/rundle-rock-50-90mm.png";
import topsoil from "@/assets/products/topsoil.jpg";
import washRock from "@/assets/products/wash-rock.jpg";

const map: Record<string, string> = {
  "black-mulch.jpg": blackMulch,
  "cedar-mulch.jpg": cedarMulch,
  "crystal-white-rock.jpg": crystalWhite,
  "garden-mix.jpg": gardenMix,
  "limestone.jpg": limestone,
  "majestic-midnight.jpg": majestic,
  "nugget-bark.jpg": nugget,
  "pine-mulch.jpg": pine,
  "play-sand.jpg": playSand,
  "purple-spark.jpg": purple,
  "radon-rock.jpg": radon,
  "red-mulch.jpg": redMulch,
  "road-crush.jpg": roadCrush,
  "rundle-rock.jpg": rundle,
  "topsoil.jpg": topsoil,
  "wash-rock.jpg": washRock,
};

const slugMap: Record<string, string> = {
  "limestone-20-30mm": limestone2030,
  "majestic-midnight-20mm": majestic20,
  "majestic-midnight-30-65mm": majestic63,
  "majestic-midnight-40mm": majestic40,
  "purple-spark-40mm": purple40,
  "rundle-50-90mm": rundle5090,
  "rundle-rock-20mm": rundle20,
  "rundle-rock-40mm": rundle40,
};

export function productImage(path?: string | null, slug?: string | null): string {
  if (slug && slugMap[slug]) return slugMap[slug];
  if (!path) return blackMulch;
  return map[path] ?? blackMulch;
}