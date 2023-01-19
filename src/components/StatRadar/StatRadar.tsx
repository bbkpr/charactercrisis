import { ResponsiveRadar } from '@nivo/radar';

// Make sure parent container has a defined height
export const StatRadar = ({ data, character_name }) => (
  <ResponsiveRadar
    blendMode="multiply"
    colors={{ scheme: 'dark2' }}
    isInteractive={false}
    data={data}
    dotBorderWidth={2}
    dotColor={{ theme: 'background' }}
    dotLabelYOffset={-16}
    dotSize={10}
    enableDotLabel={true}
    gridLabelOffset={36}
    indexBy="stat"
    keys={[character_name]}
    margin={{ top: 48, right: 0, bottom: 48, left: 0 }}
    motionConfig="wobbly"
  />
);
