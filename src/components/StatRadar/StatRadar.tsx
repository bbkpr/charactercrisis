// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radar
import { ResponsiveRadar } from '@nivo/radar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const StatRadar = ({ data /* see data tab */ }) => (
  <ResponsiveRadar
    data={data}
    keys={['character']}
    indexBy="stat"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    gridLabelOffset={36}
    enableDotLabel={true}
    dotLabelYOffset={-16}
    dotSize={10}
    dotColor={{ theme: 'background' }}
    dotBorderWidth={2}
    colors={{ scheme: 'dark2' }}
    blendMode="multiply"
    motionConfig="wobbly"
  />
);
