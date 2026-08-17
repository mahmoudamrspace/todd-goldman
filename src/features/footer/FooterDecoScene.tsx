import { FooterDecoMotion, type FooterDecoPreset } from "@/features/FooterDecoMotion";
import { FooterResponsiveSvg } from "./FooterResponsiveSvg";

function FooterDecoElement({
  preset,
  wrapperClassName,
  name,
  svgClassName,
  desktopHref,
  tabletHref,
}: {
  preset?: FooterDecoPreset;
  wrapperClassName: string;
  name: string;
  svgClassName: string;
  desktopHref: string;
  tabletHref: string;
}) {
  const svg = (
    <FooterResponsiveSvg
      name={name}
      className={svgClassName}
      desktopHref={desktopHref}
      tabletHref={tabletHref}
    />
  );

  if (preset) {
    return (
      <FooterDecoMotion preset={preset} className={wrapperClassName} data-todd-name={name}>
        {svg}
      </FooterDecoMotion>
    );
  }

  return (
    <FooterDecoMotion className={wrapperClassName} data-todd-name={name}>
      {svg}
    </FooterDecoMotion>
  );
}

/** Decorative footer scene — bees, flowers, stems, and mail envelope SVGs. */
export function FooterDecoScene() {
  return (
    <div className="todd-intro__wrapper-3 todd-hide-mobile" data-todd-name="Image" aria-hidden={true}>
      <div className="todd-footer__phone-12">
        <div className="todd-footer__mail-back" data-todd-name="Mail back">
          <FooterResponsiveSvg
            name="Mail back"
            className="todd-footer__mail-back-2"
            desktopHref="#svg-226076407_725"
            tabletHref="#svg1322836612_703"
          />
        </div>
        <FooterDecoElement
          wrapperClassName="todd-footer__bee-4-2"
          name="Bee-4"
          svgClassName="todd-footer__bee-4"
          desktopHref="#svg-1519463729_384"
          tabletHref="#svg1707044567_382"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-7-2"
          name="Flower-7"
          svgClassName="todd-footer__flower-7"
          desktopHref="#svg98908316_1096"
          tabletHref="#svg-205836683_1097"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__bee-1"
          name="Bee-1"
          svgClassName="todd-footer__bee-1-2"
          desktopHref="#svg1195524220_965"
          tabletHref="#svg1080232311_975"
        />
        <FooterDecoElement
          preset="stem6"
          wrapperClassName="todd-footer__stem-6-2"
          name="Stem-6"
          svgClassName="todd-footer__stem-6"
          desktopHref="#svg138583917_277"
          tabletHref="#svg1376898543_275"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__stem-5-2"
          name="Stem-5"
          svgClassName="todd-footer__stem-5"
          desktopHref="#svg-186645044_286"
          tabletHref="#svg-1413209763_286"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__stem-9"
          name="Stem-9"
          svgClassName="todd-footer__stem-9-2"
          desktopHref="#svg-1103376068_482"
          tabletHref="#svg1099019237_480"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-1"
          name="Flower-1"
          svgClassName="todd-footer__flower-1-2"
          desktopHref="#svg955727017_2282"
          tabletHref="#svg-667324928_2257"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-9"
          name="Flower-9"
          svgClassName="todd-footer__flower-9-2"
          desktopHref="#svg1618025311_1097"
          tabletHref="#svg1072683184_1104"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-5"
          name="Flower-5"
          svgClassName="todd-footer__flower-5-2"
          desktopHref="#svg2043460706_2163"
          tabletHref="#svg590588207_2130"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-3-2"
          name="Flower-3"
          svgClassName="todd-footer__flower-3"
          desktopHref="#svg-1158744089_1112"
          tabletHref="#svg-305542571_1132"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__bee-3"
          name="Bee-3"
          svgClassName="todd-footer__bee-3-2"
          desktopHref="#svg-1962913764_387"
          tabletHref="#svg-974612198_386"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__bee-2"
          name="Bee-2"
          svgClassName="todd-footer__bee-2-2"
          desktopHref="#svg-470829930_785"
          tabletHref="#svg-1778732115_787"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-8-2"
          name="Flower-8"
          svgClassName="todd-footer__flower-8"
          desktopHref="#svg-1245005864_1106"
          tabletHref="#svg1171261625_1102"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-2"
          name="Flower-2"
          svgClassName="todd-footer__flower-2-2"
          desktopHref="#svg-1839134178_1093"
          tabletHref="#svg1987642878_1113"
        />
        <FooterDecoElement
          preset="stem4"
          wrapperClassName="todd-footer__stem-4-2"
          name="Stem-4"
          svgClassName="todd-footer__stem-4"
          desktopHref="#svg-1667862919_287"
          tabletHref="#svg1812747621_284"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__stem-10"
          name="Stem-10"
          svgClassName="todd-footer__stem-10-2"
          desktopHref="#svg1404849184_481"
          tabletHref="#svg2032422710_482"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-10"
          name="Flower-10"
          svgClassName="todd-footer__flower-10-2"
          desktopHref="#svg-307921333_1058"
          tabletHref="#svg942345922_1071"
        />
        <div className="todd-footer__mail-front" data-todd-name="Mail front">
          <FooterResponsiveSvg
            name="Mail front"
            className="todd-footer__mail-front-2"
            desktopHref="#svg158658355_458"
            tabletHref="#svg338496860_446"
          />
        </div>
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-6-2"
          name="Flower-6"
          svgClassName="todd-footer__flower-6"
          desktopHref="#svg-640901281_1241"
          tabletHref="#svg1255717965_1234"
        />
        <FooterDecoElement
          wrapperClassName="todd-footer__flower-4"
          name="Flower-4"
          svgClassName="todd-footer__flower-4-2"
          desktopHref="#svg879312155_2202"
          tabletHref="#svg-1760681481_2196"
        />
      </div>
    </div>
  );
}
