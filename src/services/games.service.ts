import { Game } from '../models/game';
import { EntitiesData } from '../state/dtos';
import { gamesLoaded } from '../state/gamesSlice';
import { AppDispatch } from '../state/store';
import { supabase } from './supabase.service';

const gameSelector = `
id,
name,
description,
created_at,
updated_at,
abbreviation,
character (
  id,
  name,
  description,
  reference_link,
  character_image (
    character_id,
    image_id,
    image_type,
    image (
      id,
      name,
      description,
      created_at,
      updated_at,
      bucket,
      path
    )
  ),
  character_stat (
    character_id,
    stat_id,
    comments,
    value,
    stat (
      id,
      name,
      description,
      created_at,
      updated_at
    )
  ),
  character_tag (
    character_id,
    tag_id,
    comments,
    value,
    tag (
      id,
      name,
      description,
      created_at,
      updated_at,
      category
    )
  )
)
`;
export const loadGame = async (dispatch: AppDispatch, game_id: number) => {
  return dispatch(
    gamesLoaded(
      (await supabase
        .from('game')
        .select(gameSelector)
        .eq('id', game_id)
        .order('name', { foreignTable: 'character' })
        .order('stat_id', { foreignTable: 'character.character_stat' })) as EntitiesData<Game>
    )
  );
};

export const loadGames = async (dispatch: AppDispatch) => {
  return dispatch(
    gamesLoaded(
      (await supabase
        .from('game')
        .select(gameSelector)
        .order('name')
        .order('name', { foreignTable: 'character' })
        .order('stat_id', { foreignTable: 'character.character_stat' })) as EntitiesData<Game>
    )
  );
};
