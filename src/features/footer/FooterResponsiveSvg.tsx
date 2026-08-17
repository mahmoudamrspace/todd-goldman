const SVG_CONTAINER_STYLE = {
  imageRendering: "pixelated",
  flexShrink: "0",
} as const;

const SVG_INNER_STYLE = {
  width: "100%",
  height: "100%",
  aspectRatio: "inherit",
} as const;

export function FooterResponsiveSvg({
  name,
  className,
  desktopHref,
  tabletHref,
  shadows = true,
}: {
  name: string;
  className: string;
  desktopHref: string;
  tabletHref: string;
  shadows?: boolean;
}) {
  const renderSvg = (href: string) => (
    <div
      data-todd-component-type="SVG"
      data-todd-name={name}
      {...(shadows ? { "data-todd-shadows": true } : {})}
      className={className}
      aria-hidden={true}
      style={SVG_CONTAINER_STYLE}
    >
      <div className="svgContainer" style={SVG_INNER_STYLE}>
        <svg style={{ width: "100%", height: "100%" }}>
          <use href={href} />
        </svg>
      </div>
    </div>
  );

  return (
    <>
      <div className="ssr-variant todd-hide-tablet">{renderSvg(desktopHref)}</div>
      <div className="ssr-variant todd-hide-mobile todd-hide-desktop">{renderSvg(tabletHref)}</div>
    </>
  );
}
