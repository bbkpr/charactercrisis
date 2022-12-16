import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.service';
import MainColumn from '../MainColumn/MainColumn';

function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const loadCharacters = async () => {
      const { data } = (await supabase.from('character').select('*')) as any;
      setCharacters(data);
    };

    loadCharacters();
  }, []);

  return <MainColumn title={'Characters'}>{characters.map((d) => d.name).join(', ')}</MainColumn>;
}

export default Characters;
