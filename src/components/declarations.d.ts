declare module "./Aurora" {
  import React from "react";
  interface AuroraProps {
    colorStops?: string[];
    blend?: number;
    amplitude?: number;
    speed?: number;
    className?: string;
  }
  const Aurora: React.FC<AuroraProps>;
  export default Aurora;
}

declare module "./LiquidHalftone" {
  import React from "react";
  const LiquidHalftone: React.FC<any>;
  export default LiquidHalftone;
}
