"use client";

import type { IntroContent } from "@/content/section-types";
import { toddSceneArt } from "@/content/todd-scenes";
import { useHeroScroll } from "@/features/HeroScrollContext";
import { HiddenReveal } from "@/features/HiddenReveal";
import { Scribble } from "@/entities/Scribble";
import { IntroGreeting, IntroHeadline } from "@/features/IntroHeadline";
import { cn } from "@/shared/lib/cn";
import { responsiveHiddenOn, responsiveVisibleOnly, TODD } from "@/shared/lib/todd-semantic-classes";

export function Intro({ content }: { content: IntroContent }) {
  const heroScroll = useHeroScroll();

  return (
    <section ref={heroScroll?.setIntroElement} className={cn(TODD.intro.section, "todd-intro")} data-todd-name={"Intro"} id={"text_intro"}>
      <div className={cn(TODD.intro.container, "todd-intro__container")} data-todd-name={"Container"}>
        <div className={cn(TODD.intro.wrapper, "todd-intro__wrapper")} data-todd-name={"Wrapper"}>
          <div className={cn(TODD.intro.title, "todd-intro__wrapper-10")} data-todd-name={"Title"}>
            <HiddenReveal variant="intro-decor" className={cn(TODD.intro.decorTeapot, "todd-intro__wrapper-7")} data-todd-name={"Teapot"} style={{"willChange": "transform", "opacity": "0", "transform": "rotate(-18deg)"}}>
              <div data-todd-component-type={"SVG"} data-todd-shadows className={"todd-intro__svg"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 107 78%22 overflow=%22visible%22><g><path d=%22M 0.582 20.583 C 0.582 20.583 2.256 20.081 3.273 21.157 C 4.291 22.233 6.255 27.181 7.055 27.898 C 7.855 28.614 11.489 30.05 11.489 30.05 L 11.489 42.386 L 6.034 43.174 L 1.017 42.745 L 0 24.458 L 0.582 20.586 Z M 52.524 67.238 L 53.05 71.048 L 59.596 72.675 L 61.872 74.639 L 62.213 76.94 C 62.213 76.94 60.563 77.838 57.601 77.95 C 54.639 78.062 44.054 77.95 44.054 77.95 L 39.612 77.613 L 38.93 76.267 L 39.726 68.998 L 39.385 66.892 L 52.521 67.235 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 10.811 24.526 L 10.811 44.52 L 12.293 45.494 L 25.841 46.2 C 25.841 46.2 30.389 46.86 33.455 50.174 C 36.521 53.492 37.411 62.365 37.411 62.365 L 37.411 67.729 C 37.411 67.729 41.209 69.095 47.321 69.095 C 53.432 69.095 55.58 67.838 55.58 67.838 C 55.58 67.838 56.082 51.818 53.472 43.827 C 50.861 35.835 40.082 28.206 40.082 28.206 C 40.082 28.206 34.446 24.909 26.433 24.13 L 10.811 24.519 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 79.514 46.192 C 79.514 46.192 82.801 46.462 83.155 47.436 C 83.51 48.41 82.396 49.483 82.396 49.483 C 82.396 49.483 83.711 49.658 83.788 49.832 C 83.865 50.007 84.343 51.008 83.179 51.704 C 83.179 51.704 84.243 51.879 84.42 52.427 C 84.598 52.975 83.915 54.276 83.915 54.276 C 83.915 54.276 85.562 54.649 85.535 55.923 C 85.508 57.197 79.384 57.197 79.384 57.197 C 79.384 57.197 76.944 58.197 74.885 57.92 C 72.827 57.646 70.394 48.855 70.394 48.855 L 79.514 46.188 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 79.449 43.504 L 82.223 41.065 L 87.558 39.652 L 93.639 41.58 L 97.1 45.505 L 98.237 48.868 L 98.237 53.648 L 97.1 56.965 L 95.369 59.161 L 93.194 60.623 L 89.83 61.597 L 86.37 60.963 L 83.502 59.695 L 80.536 56.622 L 79.104 53.499 L 78.411 50.621 L 77.966 46.719 L 74.9 48.086 L 75.888 54.718 L 78.508 59.893 L 82.22 63.548 L 86.865 65.449 C 86.865 65.449 90.721 65.644 92.156 65.399 C 93.592 65.155 99.178 63.449 101.501 57.157 C 103.823 50.865 101.845 45.746 101.845 45.746 L 97.99 39.404 C 97.99 39.404 93.786 36.087 89.881 35.843 C 85.975 35.598 81.969 37.209 81.969 37.209 C 81.969 37.209 78.756 39.794 77.421 43.111 L 79.449 43.501 Z%22 fill=%22rgb(244,99,57)%22></path><path d=%22M 77.22 36.398 C 77.789 36.18 78.927 36.421 79.469 37.177 C 80.012 37.933 80.035 39.464 79.469 39.933 C 78.904 40.402 77.615 40.762 77.615 40.762 C 77.615 40.762 76.022 40.907 75.47 39.956 C 74.918 39.006 75.119 37.811 75.564 37.226 C 76.009 36.642 77.22 36.398 77.22 36.398 Z M 86.043 31.328 C 86.672 31.004 88.315 31.298 88.914 31.889 C 89.513 32.48 89.393 33.942 89.393 33.942 C 89.393 33.942 88.974 35.916 87 36.322 C 85.025 36.728 84.188 34.985 83.981 34.662 C 83.773 34.338 84.101 32.773 84.279 32.42 C 84.456 32.067 86.043 31.328 86.043 31.328 Z M 96.618 33.787 C 96.946 33.618 98.807 33.45 99.778 34.378 C 100.752 35.305 100.872 36.837 100.872 36.837 L 100.203 38.187 C 100.203 38.187 98.138 39.263 96.494 38.636 C 94.851 38.009 95.219 35.609 95.219 35.609 C 95.219 35.609 95.675 34.275 96.618 33.787 Z M 101.488 45.697 C 101.488 45.697 101.347 44.442 101.488 43.884 C 101.628 43.327 102.877 42.049 102.877 42.049 L 105.397 41.934 C 105.397 41.934 107 42.841 107 44.188 C 107 45.535 106.056 46.466 106.056 46.466 C 106.056 46.466 105.019 47.208 103.888 47.024 C 102.756 46.839 101.485 45.7 101.485 45.7 Z M 101.424 55.22 C 101.515 54.484 102.485 53.262 103.539 52.866 C 104.594 52.47 105.862 53.233 106.203 53.814 C 106.545 54.395 106.481 55.738 106.481 55.738 C 106.481 55.738 106.388 57.418 105.551 57.907 C 104.714 58.395 102.391 57.907 102.391 57.907 C 102.391 57.907 101.23 56.775 101.424 55.217 Z M 95.728 63.169 C 96.501 61.977 98.857 63.476 99.199 64.238 C 99.54 65.001 99.57 66.407 98.827 67.08 C 98.084 67.754 96.535 68.15 95.203 67.08 C 93.871 66.011 94.614 64.208 94.614 64.208 Z M 86.796 65.446 C 86.796 65.446 88.385 66.04 88.509 67.325 C 88.633 68.609 88.034 69.526 87.435 69.893 C 86.836 70.259 85.41 70.352 84.419 69.13 C 83.429 67.909 84.731 66.103 84.731 66.103 C 84.731 66.103 86.146 65.103 86.799 65.446 Z M 79.988 60.874 L 80.484 63.136 C 80.484 63.136 80.206 64.268 79.369 64.849 C 78.532 65.43 76.488 65.308 75.868 63.809 C 75.249 62.31 76.488 60.997 77.2 60.63 C 77.913 60.264 79.838 60.188 79.988 60.874 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 71.983 45.701 L 77.381 43.066 C 77.381 43.066 80.892 42.726 81.782 43.505 C 82.673 44.284 81.883 45.945 81.287 46.09 C 80.691 46.235 77.08 47.503 77.08 47.503 C 77.08 47.503 77.381 51.794 73.67 52.088 C 69.962 52.382 71.98 45.701 71.98 45.701 Z M 50.028 9.185 C 50.028 9.185 52.813 6.868 53.067 6.551 C 53.321 6.234 54.024 3.151 54.024 3.151 C 54.024 3.151 52.619 2.019 51.407 2.019 C 50.196 2.019 48.897 3.907 48.897 3.907 C 48.897 3.907 49.426 0.821 48.278 0.695 C 47.13 0.57 45.724 1.388 45.724 1.388 C 45.724 1.388 45.149 0.002 43.873 0.002 C 42.598 0.002 41.574 1.263 41.574 1.263 C 41.574 1.263 40.363 0.068 39.275 0.002 C 38.187 -0.064 37.742 1.514 37.742 1.514 C 37.742 1.514 37.167 0.57 35.764 1.138 C 34.362 1.705 35.764 6.492 35.764 6.492 L 36.912 8.509 L 44.255 10.902 L 50.028 9.189 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 35.679 7.997 L 50.669 9.238 C 50.669 9.238 49.411 19.993 48.992 21.439 C 48.574 22.888 47.945 30.642 47.945 30.642 L 49.538 33.949 L 54.444 38.706 L 72.58 44.288 L 75.515 58.66 L 74.046 59.902 L 60.629 55.663 C 60.629 55.663 52.767 51.735 48.363 48.22 C 43.959 44.704 40.291 37.158 40.291 37.158 L 36.937 25.37 L 35.679 8.001 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 60.126 15.734 C 60.126 15.734 66.01 16.137 69.507 19.471 C 73.001 22.805 74.4 29.585 74.4 29.585 C 74.4 29.585 72.904 36.596 71.469 37.745 C 70.033 38.894 63.624 40.732 58.788 40.561 C 53.952 40.389 49.584 35.563 48.359 33.322 C 47.134 31.08 47.114 28.529 47.884 26.096 C 48.654 23.663 51.425 20.049 53.881 17.979 C 56.338 15.909 60.126 15.738 60.126 15.738 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 53.871 18.003 C 53.871 18.003 56.736 19.841 58.426 19.841 C 60.116 19.841 63.553 19.383 63.553 19.383 C 63.553 19.383 64.661 22.198 65.534 23.06 C 66.408 23.921 70.394 25.991 70.394 25.991 L 72.469 26.509 L 70.022 31.249 L 70.079 35.874 L 71.458 37.772 C 71.458 37.772 74.189 35.818 75.193 30.761 C 76.197 25.704 72.994 20.818 69.497 18.405 C 66.003 15.992 61.087 12.89 53.871 18.003 Z%22 fill=%22rgb(30,30,30)%22></path><path d=%22M 61.631 24.76 C 61.631 24.76 62.33 25.12 62.18 25.813 C 62.029 26.506 60.108 27.705 60.108 27.705 C 60.108 27.705 59.315 27.794 59.074 27.523 C 58.833 27.253 58.86 26.546 59.074 26.239 C 59.288 25.932 60.881 24.909 60.881 24.909 L 61.634 24.757 Z M 63.471 27.266 C 63.471 27.266 63.984 27.83 63.967 28.17 C 63.95 28.51 62.347 29.553 62.347 29.553 C 62.347 29.553 61.547 29.722 61.323 29.553 C 61.099 29.385 61.323 28.375 61.323 28.375 C 61.323 28.375 62.705 27.282 62.976 27.266 C 63.247 27.249 63.471 27.266 63.471 27.266 Z%22 fill=%22rgb(30,30,30)%22></path><path d=%22M 54.909 24.459 L 55.622 24.905 L 54.598 26.525 C 54.598 26.525 54.457 28.734 54.598 29.321 C 54.738 29.909 56.241 31.81 56.241 31.81 C 56.241 31.81 58.339 32.873 59.075 32.899 C 59.812 32.926 63.098 32.899 63.098 32.899 L 63.353 33.883 L 61.227 34.045 C 61.227 34.045 59.414 34.197 58.025 33.883 C 56.636 33.57 54.534 32.087 54.534 32.087 C 54.534 32.087 53.068 30.354 53.038 29.014 C 53.008 27.674 53.463 25.967 53.463 25.967 Z%22 fill=%22rgb(213,68,41)%22></path><path d=%22M 66.889 17.516 L 84.433 10.96 L 85.608 12.495 L 74.958 26.468 Z%22 fill=%22rgb(244,99,57)%22></path><path d=%22M 83.412 11.326 L 85.561 7.461 L 90.126 4.434 L 94.564 4.714 L 97.726 5.506 C 97.726 5.506 100.23 4.387 101.221 3.272 C 101.221 3.272 102.968 2.991 102.968 3.783 C 102.968 3.783 101.033 6.299 99.711 6.995 C 98.389 7.692 95.792 7.272 95.792 7.272 L 92.723 6.157 C 92.723 6.157 89.939 6.018 89.042 6.949 C 89.042 6.949 91.354 6.668 92.536 7.553 C 93.717 8.438 94.661 9.507 96.314 9.507 C 97.967 9.507 99.289 8.761 99.289 8.761 C 99.289 8.761 101.746 7.457 102.499 7.457 C 103.252 7.457 104.34 7.527 104.34 8.005 C 104.34 8.484 104.102 9.461 104.102 9.461 L 102.593 9.553 C 102.593 9.553 99.808 11.788 98.249 11.788 C 96.689 11.788 95.039 11.369 95.039 11.369 L 92.633 10.157 C 92.633 10.157 91.451 9.18 90.886 9.18 C 90.32 9.18 87.77 9.831 87.77 9.831 L 90.273 10.389 C 90.273 10.389 92.255 12.392 93.249 12.95 C 94.243 13.508 96.033 14.439 97.78 13.973 C 99.527 13.508 102.171 12.25 102.171 12.25 L 104.343 12.112 L 104.343 13.65 L 103.634 14.102 L 102.596 14.102 L 99.386 15.512 C 99.386 15.512 97.121 16.631 95.233 16.07 C 93.346 15.512 90.795 13.696 90.795 13.696 L 88.717 11.881 C 88.717 11.881 86.491 11.283 85.568 12.491 C 84.644 13.699 83.419 11.319 83.419 11.319 Z%22 fill=%22rgb(240,205,62)%22></path></g></svg>')"}}>              </div>
            </HiddenReveal>
            <HiddenReveal
              variant="intro-character"
              className={cn(TODD.intro.decorNeverGrowUp, "todd-intro-art")}
              data-todd-name="Never Grow Up illustration"
              style={{
                willChange: "transform",
                opacity: "0",
                transform: "translateY(18px)",
              }}
            >
              <div className="todd-intro-art-stage">
                <img
                  src={toddSceneArt.introNeverGrowUp}
                  alt=""
                  aria-hidden={true}
                />
                <span className="todd-ngu-eye todd-ngu-eye--left">
                  <span className="todd-ngu-eye__lid" />
                  <span className="todd-ngu-eye__iris">
                    <span className="todd-ngu-eye__glint" />
                  </span>
                </span>
                <span className="todd-ngu-eye todd-ngu-eye--right">
                  <span className="todd-ngu-eye__lid" />
                  <span className="todd-ngu-eye__iris">
                    <span className="todd-ngu-eye__glint" />
                  </span>
                </span>
                <span className="todd-ngu-ornament todd-ngu-ornament--purple">
                  <span className="todd-ngu-ornament__mask" />
                  <span className="todd-ngu-ornament__ball" />
                </span>
                <span className="todd-ngu-ornament todd-ngu-ornament--red">
                  <span className="todd-ngu-ornament__mask" />
                  <span className="todd-ngu-ornament__ball" />
                </span>
                <span className="todd-ngu-ornament todd-ngu-ornament--orange">
                  <span className="todd-ngu-ornament__mask" />
                  <span className="todd-ngu-ornament__ball" />
                </span>
                <span className="todd-ngu-ornament todd-ngu-ornament--yellow">
                  <span className="todd-ngu-ornament__mask" />
                  <span className="todd-ngu-ornament__ball" />
                </span>
                <span className="todd-ngu-needle todd-ngu-needle--1" />
                <span className="todd-ngu-needle todd-ngu-needle--2" />
                <span className="todd-ngu-needle todd-ngu-needle--3" />
              </div>
            </HiddenReveal>
            <div className="ssr-variant todd-responsive-variant">
              <div className={cn(TODD.intro.greeting, "todd-intro__wrapper-13")} data-todd-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                <IntroGreeting text={content.greeting} />
              </div>
            </div>
          </div>
          <div className="ssr-variant todd-responsive-variant">
            <div className={cn(TODD.intro.scribble, "todd-intro__wrapper-21", "todd-hide-mobile")} style={{"transform": "translateY(-50%)"}}>
              <Scribble variant="type2" />
            </div>
          </div>
          <div className="ssr-variant todd-responsive-variant">
            <div className={cn(TODD.intro.scribble, "todd-intro__wrapper-32", "todd-hide-desktop", "todd-hide-tablet")} style={{"transform": "translateX(-50%)"}}>
              <Scribble variant="mobile" />
            </div>
          </div>
          <div className={responsiveHiddenOn("mobile")}>
            <div className={cn(TODD.intro.headline, "todd-intro__wrapper-26")} data-todd-component-type={"RichTextContainer"} style={{"transform": "none"}}>
              <IntroHeadline fontSize="72px" headline={content.headline} />
            </div>
          </div>
          <div className={responsiveVisibleOnly("mobile")}>
            <div className={cn(TODD.intro.headline, "todd-intro__wrapper-26")} data-todd-component-type={"RichTextContainer"} style={{"transform": "none"}}>
              <IntroHeadline fontSize="48px" headline={content.headline} />
            </div>
          </div>
          <HiddenReveal
            variant="intro-character"
            className="todd-intro-snow-scene"
            data-todd-name="Never Grow Up Part 2"
            style={{
              willChange: "transform",
              opacity: "0",
              transform: "translateY(36px)",
            }}
          >
            <div className="todd-intro-snow-stage">
              <img
                src={toddSceneArt.introNeverGrowUpSecond}
                alt=""
                aria-hidden={true}
                className="todd-intro-snow-base"
              />
              <span
                className="todd-intro-snow-restoration todd-intro-snow-restoration--thrower"
                aria-hidden={true}
              />
              <img
                src={toddSceneArt.introNeverGrowUpSecond}
                alt=""
                aria-hidden={true}
                className="todd-intro-snow-actor todd-intro-snow-actor--thrower"
              />
              <span className="todd-intro-snow-launch" aria-hidden={true} />
              <span className="todd-intro-snow-trail" aria-hidden={true} />
              <span className="todd-intro-snowball" aria-hidden={true} />
              <span className="todd-intro-snow-contact" aria-hidden={true} />
              <span className="todd-intro-snow-impact" aria-hidden={true}>
                <span className="todd-intro-snow-particle todd-intro-snow-particle--1" />
                <span className="todd-intro-snow-particle todd-intro-snow-particle--2" />
                <span className="todd-intro-snow-particle todd-intro-snow-particle--3" />
              </span>
              <span className="todd-intro-snow-eye todd-intro-snow-eye--yeti-left">
                <span className="todd-intro-snow-eye__iris">
                  <span className="todd-intro-snow-eye__glint" />
                </span>
              </span>
              <span className="todd-intro-snow-eye todd-intro-snow-eye--yeti-right">
                <span className="todd-intro-snow-eye__iris">
                  <span className="todd-intro-snow-eye__glint" />
                </span>
              </span>
            </div>
          </HiddenReveal>
          <HiddenReveal variant="intro-character" className={"todd-intro__wrapper-27"} data-todd-name={"Character"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(50px) scale(0.5)"}}>
            <div className={responsiveHiddenOn("mobile")}>
              <div data-todd-component-type={"SVG"} data-todd-name={"Character svg"} data-todd-shadows className={"todd-intro__character-svg"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                  <svg style={{"width": "100%", "height": "100%"}}>
                    <use href={"#svg883507141_4741"}>                    </use>
                  </svg>
                </div>
              </div>
            </div>
            <div className={responsiveVisibleOnly("mobile")}>
              <div data-todd-component-type={"SVG"} data-todd-name={"Character svg"} data-todd-shadows className={"todd-intro__character-svg"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                  <svg style={{"width": "100%", "height": "100%"}}>
                    <use href={"#svg1257273980_4610"}>                    </use>
                  </svg>
                </div>
              </div>
            </div>
          </HiddenReveal>
        </div>
      </div>
    </section>
  );
}
