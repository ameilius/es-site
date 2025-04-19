
declare module '@changey/react-leaflet-markercluster' {
  import { FC } from 'react';
  
  interface MarkerClusterGroupProps {
    chunkedLoading?: boolean;
    maxClusterRadius?: number;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    children?: React.ReactNode;
  }

  const MarkerClusterGroup: FC<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}
