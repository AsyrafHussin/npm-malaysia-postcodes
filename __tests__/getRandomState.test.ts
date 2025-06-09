import { getRandomState, getStates } from '../src';

describe('getRandomState', () => {
  it('should be defined', () => {
    expect(getRandomState).toBeDefined();
  });

  it('should return a valid state string', () => {
    const randomState = getRandomState();

    expect(typeof randomState).toBe('string');
    expect(randomState.length).toBeGreaterThan(0);
  });

  it('should return a state that exists in the dataset', () => {
    const randomState = getRandomState();
    const allStates = getStates();

    expect(allStates).toContain(randomState);
  });

  it('should return different states on multiple calls', () => {
    const states = new Set();

    for (let i = 0; i < 10; i++) {
      states.add(getRandomState());
    }

    expect(states.size).toBeGreaterThan(1);
  });

  it('should only return valid Malaysian states', () => {
    const validStates = getStates();

    for (let i = 0; i < 5; i++) {
      const randomState = getRandomState();
      expect(validStates).toContain(randomState);
    }
  });
});
