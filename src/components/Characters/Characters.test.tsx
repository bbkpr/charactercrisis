// src/components/Characters/Characters.test.tsx

import { screen, fireEvent, waitFor } from '@testing-library/react';
import Characters from './Characters';

// Mock the loadCharacters function
jest.mock('../../services/characters.service', () => ({
  loadCharacters: jest.fn()
}));

// Import the mocked function
import { loadCharacters } from '../../services/characters.service';
import { renderWithProviderAndRouter } from '../../utils/testUtils';
import fakedCharacters from '../../utils/testFakes';

const renderCharacters = () => {
  renderWithProviderAndRouter(<Characters />, {
    routePath: '/characters',
    preloadedState: { characters: fakedCharacters }
  });
};

describe('Characters component', () => {
  beforeEach(() => {
    (loadCharacters as jest.Mock).mockClear();
  });

  test('calls the loadCharacters function', () => {
    renderCharacters();
    expect(loadCharacters).toHaveBeenCalled();
  });

  test('renders the characters', async () => {
    (loadCharacters as jest.Mock).mockImplementationOnce((dispatch) => {
      dispatch({ type: 'characters/loadCharacters', payload: [] });
    });
    renderCharacters();
    await waitFor(() => expect(screen.getByText('Characters')).toBeInTheDocument());
    fakedCharacters.forEach((fc) => {
      expect(screen.getAllByText(fc.name)[0]).toBeInTheDocument();
      expect(screen.getAllByText(fc.description)[0]).toBeInTheDocument();
      expect(screen.getAllByText(fc.character_tag[0].tag.name)[0]).toBeInTheDocument();
      expect(screen.getAllByText(fc.character_stat[0].stat.name)[0]).toBeInTheDocument();
    });
  });

  test('changes UI state on button click', async () => {
    renderCharacters();
    fireEvent.click(await screen.findByText('Small'));
    expect(await screen.findByText('Small')).toHaveClass('active');
    fireEvent.click(await screen.findByText('Compact'));
    expect(await screen.findByText('Compact')).toHaveClass('active');
    fireEvent.click(await screen.findByText('Normal'));
    expect(await screen.findByText('Normal')).toHaveClass('active');
  });
});
