// src/components/Characters/Characters.test.tsx

import { screen, fireEvent, waitFor } from '@testing-library/react';
import Characters from './Characters';

// Mock the loadCharacters function
jest.mock('../../services/characters.service', () => ({
  loadCharacters: jest.fn(),
  loadStats: jest.fn()
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

xdescribe('Characters component', () => {
  beforeEach(() => {
    (loadCharacters as jest.Mock).mockClear();
  });

  xtest('calls the loadCharacters function', () => {
    renderCharacters();
    expect(loadCharacters).toHaveBeenCalled();
  });

  xtest('renders the characters', async () => {
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

  xtest('changes UI state on button click', async () => {
    renderCharacters();
    fireEvent.click(await screen.findByText('Small'));
    expect(await screen.findByText('Small')).toHaveClass('active');
    fireEvent.click(await screen.findByText('Compact'));
    expect(await screen.findByText('Compact')).toHaveClass('active');
    fireEvent.click(await screen.findByText('Normal'));
    expect(await screen.findByText('Normal')).toHaveClass('active');
  });

  // Filters characters by selected game
  it('should filter characters by selected game', () => {
    // Mock dependencies
    const mockDispatch = jest.fn();
    const mockUseAppDispatch = jest.spyOn(redux, 'useAppDispatch').mockReturnValue(mockDispatch);
    const mockCharacters = [
      { id: 1, name: 'Character 1', game_id: 1 },
      { id: 2, name: 'Character 2', game_id: 2 },
      { id: 3, name: 'Character 3', game_id: 1 }
    ];
    const mockGames = [
      { id: 1, name: 'Game 1' },
      { id: 2, name: 'Game 2' }
    ];
    const mockStats = [
      { id: 1, name: 'Stat 1' },
      { id: 2, name: 'Stat 2' }
    ];
    const mockUseAppSelector = jest.spyOn(redux, 'useAppSelector');
    mockUseAppSelector.mockReturnValueOnce(mockCharacters);
    mockUseAppSelector.mockReturnValueOnce(mockGames);
    mockUseAppSelector.mockReturnValueOnce(mockStats);

    // Render the component
    render(<Characters />);

    // Select a game
    fireEvent.click(screen.getByText('Game 1'));

    // Assertions
    expect(mockUseAppDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledTimes(4);
    expect(mockDispatch).toHaveBeenCalledWith(charactersLoaded(mockCharacters));
    expect(mockDispatch).toHaveBeenCalledWith(gamesLoaded(mockGames));
    expect(mockDispatch).toHaveBeenCalledWith(statsLoaded(mockStats));
    expect(screen.getAllByTestId('character-item')).toHaveLength(2);
  });
});
