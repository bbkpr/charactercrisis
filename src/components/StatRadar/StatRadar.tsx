import { ResponsiveRadar } from '@nivo/radar';
import { normalizedLetterGrade } from '../../utils/utils';

export const StatRadar = ({ data, character_name }) => (
  <ResponsiveRadar
    blendMode="multiply"
    borderWidth={2}
    colors={{ scheme: 'dark2' }}
    theme={{ background: '#f3f3f3', grid: { line: { backgroundColor: '#ff0000' } } }}
    isInteractive={false}
    data={data}
    dotBorderWidth={2}
    dotColor={{ theme: 'background' }}
    dotLabelYOffset={-12}
    dotSize={10}
    enableDotLabel={true}
    gridLabelOffset={12}
    gridShape="linear"
    indexBy="stat"
    keys={[character_name]}
    margin={{ top: 48, right: 0, bottom: 48, left: 0 }}
    motionConfig="gentle"
    maxValue={5}
    valueFormat={(v) => normalizedLetterGrade(v)}
  />
);
