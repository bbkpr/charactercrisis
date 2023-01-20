import { Game } from '../models/game';
import { EntitiesData } from '../state/dtos';
import { gamesLoaded } from '../state/gamesSlice';
import { AppDispatch } from '../state/store';
import { supabase } from './supabase.service';

export const loadGames = async (dispatch: AppDispatch) => {
  return dispatch(
    gamesLoaded(
      (await supabase
        .from('game')
        .select(
          `
        id,
        name,
        description,
        created_at,
        updated_at,
        character (
          id,
          name,
          description,
          reference_link
        )
      `
        )
        .order('name')) as EntitiesData<Game>
    )
  );
};
