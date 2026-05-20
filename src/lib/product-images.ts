import blackMulch from "@/assets/products/black-mulch.jpg";
import cedarMulch from "@/assets/products/cedar-mulch.jpg";
import crystalWhite from "@/assets/products/crystal-white-rock.jpg";
import gardenMix from "@/assets/products/garden-mix.jpg";
import limestone from "@/assets/products/limestone.jpg";
import majestic from "@/assets/products/majestic-midnight.jpg";
import nugget from "@/assets/products/nugget-bark.jpg";
import pine from "@/assets/products/pine-mulch.jpg";
import playSand from "@/assets/products/play-sand.jpg";
import purple from "@/assets/products/purple-spark.jpg";
import radon from "@/assets/products/radon-rock.jpg";
import redMulch from "@/assets/products/red-mulch.jpg";
import roadCrush from "@/assets/products/road-crush.jpg";
import rundle from "@/assets/products/rundle-rock.jpg";
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

export function productImage(path?: string | null): string {
  if (!path) return blackMulch;
  return map[path] ?? blackMulch;
}