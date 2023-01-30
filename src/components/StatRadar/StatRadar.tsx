import { ResponsiveRadar } from '@nivo/radar';
import { normalizedLetterGrade } from '../../utils/utils';

export const StatRadar = ({ data, character_name }) => (
  <ResponsiveRadar
    blendMode="multiply"
    colors={{ scheme: 'dark2' }}
    isInteractive={false}
    data={data}
    dotBorderWidth={2}
    dotColor={{ theme: 'background' }}
    dotLabelYOffset={-12}
    dotSize={10}
    enableDotLabel={true}
    gridLabelOffset={12}
    // height={height}
    // width={width}
    indexBy="stat"
    keys={[character_name]}
    margin={{ top: 48, right: 0, bottom: 48, left: 0 }}
    motionConfig="wobbly"
    maxValue={5}
    valueFormat={(v) => normalizedLetterGrade(v)}
  />
);
