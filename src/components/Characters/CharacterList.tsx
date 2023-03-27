import { Character } from '../../models/character';
import CharacterItem from './CharacterItem';

export interface ICharacterListProps {
  characters: Character[];
}

function CharacterList({ characters }: ICharacterListProps) {
  return (
    <>
      {characters.map((ch) => {
        ch && <CharacterItem key={ch.id} character={ch} />;
      })}
    </>
  );
}

export default CharacterList;
