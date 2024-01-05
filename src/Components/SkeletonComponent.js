import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonComponent({ width, height }) {
  return (
    <SkeletonTheme color="#202020" highlightColor="#CCCCCC">
      <section>
        <Skeleton height={height} width={width} />
      </section>
    </SkeletonTheme>
  );
}
