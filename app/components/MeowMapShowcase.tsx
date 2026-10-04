import Image from "next/image";
import map from "../images/screens/01-map.webp";
import nearby from "../images/screens/02-nearby-feed.webp";
import catalog from "../images/screens/03-catalog.webp";
import styles from "./MeowMapShowcase.module.css";

export default function MeowMapShowcase() {
  return (
    <figure className={styles.scene} aria-label="Three real Meow Map app screens">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`${styles.phone} ${styles.left}`}>
        <Image src={map} alt="Meow Map's live neighbourhood map" sizes="(max-width: 760px) 30vw, 180px" placeholder="blur" />
      </div>
      <div className={`${styles.phone} ${styles.right}`}>
        <Image src={catalog} alt="Cat-a-log collection in Meow Map" sizes="(max-width: 760px) 30vw, 180px" placeholder="blur" />
      </div>
      <div className={`${styles.phone} ${styles.center}`}>
        <Image src={nearby} alt="Nearby feed with real photos of neighbourhood cats" sizes="(max-width: 760px) 36vw, 215px" placeholder="blur" />
      </div>
    </figure>
  );
}
