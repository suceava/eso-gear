import { EquipmentBuild } from '../character/EquipmentBuild';
import { EsoStat, Strings_EsoStat } from '../data/eso-sets';

export interface EquipmentProps {
  build: EquipmentBuild;
}

export function EquipmentStats({ build }: EquipmentProps) {
  const statBonuses = build.getTotalBonusStats()
  const statsArray = Object.keys(EsoStat);
  // insert blank stats to make some grouping space
  statsArray.splice(16, 0, '');
  statsArray.splice(13, 0, '');
  statsArray.splice(7, 0, '');
  statsArray.splice(1, 0, '');

  return (
    <div className="equipment-stats">
      <table>
        <tbody>
        {
          statsArray.map((stat, index) => {
            if (stat === '') {
              return <tr key={index}><td colSpan={2}>&nbsp;</td></tr>;
            }

            const esoStat = stat as EsoStat;
            return (
              <tr key={index}>
                <td>{Strings_EsoStat[esoStat]}</td>
                <td>{statBonuses[esoStat] || 0}</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
  );
}
