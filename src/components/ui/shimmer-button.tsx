import React from "react";
import { Button } from "@/components/ui/button";

interface ShimmerButtonProps extends React.ComponentProps<typeof Button> {
  text: string;
  icon?: React.ReactNode;
}

const ShimmerButton = ({
  text,
  icon,
  className,
  ...props
}: ShimmerButtonProps) => {
  return (
    <div>
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shimmer-button {
          position: relative;
          overflow: hidden;
        }

        .shimmer-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }
      `}</style>

      <Button {...props} className={`shimmer-button ${className}`}>
        {text}
        {icon && <span className="mr-2">{icon}</span>}
      </Button>
    </div>
  );
};

export default ShimmerButton;
