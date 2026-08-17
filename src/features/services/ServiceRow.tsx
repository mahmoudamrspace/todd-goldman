"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { ServiceItem } from "@/content/section-types";
import { AnimatedWords, HiddenReveal } from "@/features/HiddenReveal";
import { easeOut } from "@/shared/lib/motion";
import { cn } from "@/shared/lib/cn";
import {
  externalLinkAriaLabel,
  isExternalHttpHref,
} from "@/shared/lib/external-link-label";
import { responsiveHiddenOn } from "@/shared/lib/todd-semantic-classes";
import { DecorativeImage } from "@/shared/ui/ContentImage";

const SERVICE_ROW_REVEAL_STYLE = {
  willChange: "transform",
  opacity: "0",
  transform: "translateY(16px)",
} as const;

const SERVICE_ROW_STAGGER = 0.12;
const SERVICE_TEXT_AFTER_ICON = 0.08;

const ROW_LAYOUT_CLASS = [
  "todd-services__tablet-4",
  "todd-services__tablet-2",
  "todd-services__tablet-7",
  "todd-services__tablet-6",
] as const;

function ServiceRowIcon({ decor }: { decor: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  if (reduced) {
    return (
      <div ref={ref} className="todd-services__icon" data-todd-name="Icon">
        <DecorativeImage width={172} height={106} src={decor} className="todd-services__icon-img" />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="todd-services__icon"
      data-todd-name="Icon"
      initial={{ opacity: 0, x: -30, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 20 }}
      transition={{ duration: 0.85, ease: easeOut }}
    >
      <DecorativeImage width={172} height={106} src={decor} className="todd-services__icon-img" />
    </motion.div>
  );
}

export interface ServiceRowProps {
  item: ServiceItem;
  index: number;
  decor: string;
  showIcon?: boolean;
}

/** One linked service row with responsive typography via CSS. */
export function ServiceRow({ item, index, decor, showIcon = true }: ServiceRowProps) {
  const rowClass = ROW_LAYOUT_CLASS[index] ?? ROW_LAYOUT_CLASS[0];
  const external = isExternalHttpHref(item.href);
  const linkLabel = `${item.title}${item.subtitle ? ` ${item.subtitle}` : ""}`;

  return (
    <HiddenReveal
      className={cn(rowClass, "todd-service-row")}
      variant="services-row"
      delay={index * SERVICE_ROW_STAGGER}
      style={SERVICE_ROW_REVEAL_STYLE}
    >
      <a
        className="todd-services__tablet-10 todd-services__tablet todd-layout__utility-001 todd-service-row__link"
        data-todd-name="Service"
        href={item.href}
        data-highlight
        data-cursor-label="View"
        aria-label={external ? externalLinkAriaLabel(linkLabel) : undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <div className="todd-services__icon-and-title" data-todd-name="Icon and Title">
          {showIcon ? (
            <div className={responsiveHiddenOn("mobile")}>
              <ServiceRowIcon decor={decor} />
            </div>
          ) : null}
          <div className="todd-services__tablet-11" data-todd-component-type="RichTextContainer">
            <h3 className="todd-text todd-service-row__title">
              <AnimatedWords
                variant="services"
                startDelay={showIcon ? SERVICE_TEXT_AFTER_ICON : 0}
                text={item.title}
              />
            </h3>
            {item.subtitle ? (
              <p className="todd-text todd-service-row__subtitle">{item.subtitle}</p>
            ) : null}
          </div>
        </div>
      </a>
    </HiddenReveal>
  );
}
