interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "white" | "black";
  spin?: boolean;
}

export function Logo({ width = 40, height = 40, className, variant = "white", spin = false }: LogoProps) {
  const isBlack = variant === "black";
  const fill = isBlack ? "#1c1a17" : "white";
  const fillOpacity = isBlack ? "1" : "0.8";
  const filterId = isBlack ? "logo-filter-black" : "logo-filter-white";

  return (
    <span
      className={`group block w-fit transition-opacity duration-300 hover:opacity-100 ${className ?? ""}`}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden
      >
        <defs>
          {isBlack ? (
            <filter
              id={filterId}
              x="3"
              y="4"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
          ) : (
            <filter
              id={filterId}
              x="3"
              y="4"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_24_1239"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_24_1239"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="0.5" />
              <feGaussianBlur stdDeviation="0.25" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_24_1239" />
            </filter>
          )}
        </defs>
        <g filter={`url(#${filterId})`}>
          <g
            className={`origin-center transition-transform duration-300 ${spin ? "animate-[spin_4s_linear_infinite]" : "group-hover:animate-[spin_4s_linear_infinite]"}`}
            style={{ transformOrigin: "50% 50%" }}
          >
            <path
              d="M33.4737 20C33.4737 16.2793 31.6318 13.2632 28.9548 13.2632C27.9636 13.2632 26.7492 13.6769 25.6127 14.3865C26.3222 13.25 26.7368 12.0363 26.7368 11.0452C26.7368 8.36817 23.7207 6.52632 20 6.52632C16.2793 6.52632 13.2632 8.36817 13.2632 11.0452C13.2632 12.0362 13.6771 13.2501 14.3865 14.3865C13.2501 13.6771 12.0362 13.2632 11.0452 13.2632C8.36817 13.2632 6.52632 16.2793 6.52632 20C6.52631 23.7207 8.36817 26.7368 11.0452 26.7368C12.0363 26.7368 13.25 26.3222 14.3865 25.6127C13.6769 26.7492 13.2632 27.9636 13.2632 28.9548C13.2632 31.6318 16.2793 33.4737 20 33.4737C23.7207 33.4737 26.7368 31.6318 26.7368 28.9548C26.7368 27.9635 26.3224 26.7493 25.6127 25.6127C26.7493 26.3224 27.9635 26.7368 28.9548 26.7368C31.6318 26.7368 33.4737 23.7207 33.4737 20ZM36 20C36 22.2441 35.4494 24.4335 34.3339 26.1439C33.2503 27.8052 31.5144 29.1452 29.2549 29.2549C29.1452 31.5144 27.8052 33.2503 26.1439 34.3339C24.4335 35.4494 22.2441 36 20 36C17.7559 36 15.5665 35.4494 13.8561 34.3339C12.1948 33.2503 10.8539 31.5144 10.7442 29.2549C8.48521 29.1449 6.74954 27.805 5.66612 26.1439C4.55063 24.4335 4 22.2441 4 20C4 17.7559 4.55063 15.5665 5.66612 13.8561C6.74954 12.195 8.48519 10.8542 10.7442 10.7442C10.8542 8.48519 12.195 6.74954 13.8561 5.66612C15.5665 4.55063 17.7559 4 20 4C22.2441 4 24.4335 4.55063 26.1439 5.66612C27.805 6.74954 29.1449 8.48521 29.2549 10.7442C31.5144 10.8539 33.2503 12.1948 34.3339 13.8561C35.4494 15.5665 36 17.7559 36 20Z"
              fill={fill}
              fillOpacity={fillOpacity}
              shapeRendering="crispEdges"
            />
          </g>
          <g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 14C23.3137 14 26 16.6863 26 20C26 23.3137 23.3137 26 20 26C16.6863 26 14 23.3137 14 20C14 16.6863 16.6863 14 20 14ZM23 21C23 19.3431 21.6569 21 20 21C18.3431 21 17 19.3431 17 21C17 22.6569 18.3431 24 20 24C21.6569 24 23 22.6569 23 21ZM18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17ZM22 17C21.4477 17 21 17.4477 21 18C21 18.5523 21.4477 19 22 19C22.5523 19 23 18.5523 23 18C23 17.4477 22.5523 17 22 17Z"
              fill={fill}
              fillOpacity={fillOpacity}
              shapeRendering="crispEdges"
            />
          </g>
        </g>
      </svg>
    </span>
  );
}
