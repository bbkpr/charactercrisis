import { Character } from '../models/character';
import { Stat } from '../models/stat';
import { charactersLoaded } from '../state/charactersSlice';
import { EntitiesData } from '../state/dtos';
import { statsLoaded } from '../state/statsSlice';
import { AppDispatch } from '../state/store';
import { supabase } from './supabase.service';

const characterSelector = `
id,
name,
description,
created_at,
updated_at,
reference_link,
game_id,
game (
  id,
  created_at,
  updated_at,
  name,
  description,
  abbreviation
),
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
`;

export const loadCharacters = async (dispatch: AppDispatch) => {
  return dispatch(
    charactersLoaded(
      (await supabase
        .from('character')
        .select(characterSelector)
        .order('name')
        .order('stat_id', { foreignTable: 'character_stat' })) as EntitiesData<Character>
    )
  );
};

export const loadStats = async (dispatch: AppDispatch) => {
  return dispatch(
    statsLoaded(
      (await supabase
        .from('stat')
        .select(
          `
          id,
          name,
          description,
          created_at,
          updated_at,
          character_stat (
            character_id,
            stat_id,
            comments,
            value,
            character (
              id,
              name,
              description,
              created_at,
              updated_at,
              reference_link,
              game_id,
              game (
                id,
                created_at,
                updated_at,
                name,
                description,
                abbreviation
              ),
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
          )
          `
        )
        .order('id')) as EntitiesData<Stat>
    )
  );
};
