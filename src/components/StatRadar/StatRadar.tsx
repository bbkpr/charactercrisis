import { Radar } from '@nivo/radar';

export const StatRadar = ({ data, character_name, width = 520, height = 320 }) => (
  <Radar
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
    height={height}
    indexBy="stat"
    keys={[character_name]}
    margin={{ top: 48, right: 0, bottom: 48, left: 0 }}
    motionConfig="wobbly"
    maxValue={100}
    width={width}
  />
);
