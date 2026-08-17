import { DecorativeImage } from "@/shared/ui/ContentImage";
import { imageSizes } from "@/shared/config/breakpoints";

/** Decorative footer mark image — single responsive node. */
export function FooterMarkImage({ mark }: { mark: string }) {
  return (
    <div className="todd-intro__wrapper-5 todd-footer__mark" data-todd-name="Hero illo">
      <div
        style={{
          position: "absolute",
          borderRadius: "inherit",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        data-todd-background-image-wrapper={true}
      >
        <DecorativeImage
          width={1973}
          height={2341}
          src={mark}
          sizes={imageSizes.full}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            objectPosition: "center",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
