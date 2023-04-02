import { ComponentStory, ComponentMeta } from '@storybook/react';
import Characters from './Characters';
import { Character } from '../../models/character';
import fakedCharacters from '../../utils/testFakes';
import { Provider } from 'react-redux';
import { RootState, setupStore } from '../../state/store';
import { PreloadedState } from '@reduxjs/toolkit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
require('../../app.scss');

export interface ICharacterStoryArgs {
  characters?: Character[];
}

export default {
  title: 'Components/Characters',
  component: Characters
} as ComponentMeta<typeof Characters>;

const Template: ComponentStory<typeof Characters> = (args: PreloadedState<RootState>) => (
  <Provider store={setupStore({ characters: args.characters })}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Characters />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

const sampleCharacters: Character[] = fakedCharacters;
export const Default = Template.bind({});
Default.args = { characters: sampleCharacters };

export const Sample = Template.bind({});
Sample.args = {
  characters: sampleCharacters
};
