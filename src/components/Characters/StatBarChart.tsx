import { ResponsiveBar } from '@nivo/bar';
import { Character } from '../../models/character';

interface StatBarChartProps {
  sortedCharacters: Character[];
}

const StatBarChart: React.FC<StatBarChartProps> = ({ sortedCharacters }) => {
  const data = sortedCharacters.map((character) => {
    const statData = character.character_stat.reduce((obj, s) => {
      obj[s.stat.name] = s.value;
      return obj;
    }, {} as { [key: string]: number });

    return {
      character: character.name,
      ...statData
    };
  });

  return (
    <div style={{ height: '500px' }}>
      <ResponsiveBar
        data={data}
        keys={sortedCharacters[0].character_stat.map((s) => s.stat.name)}
        indexBy="character"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Character',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Value',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionConfig={{
          damping: 15
        }}
      />
    </div>
  );
};

export default StatBarChart;
