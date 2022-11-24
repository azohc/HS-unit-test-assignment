import { expect, it, describe, vi, afterEach, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Ratings from '../Rating.vue';
import * as moonScore from '../utils/moonScore';

describe('Ratings.vue', () => {
  let spy;
  beforeEach(() => {
    // spy-less mock
    // vi.mock('../utils/moonScore', () => ({
    //   getMoonScore: vi.fn((n) => n * 2),
    // }));

    // spy-ful Mock
    spy = vi.spyOn(moonScore, 'getMoonScore').mockImplementation((n) => n * 2);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = mount(Ratings);
    expect(wrapper.exists()).toBe(true);
  });

  it('shows the score', () => {
    const wrapper = mount(Ratings, { props: { score: 11 } });
    expect(spy).toHaveBeenCalledOnce();
    expect(wrapper.props()).toHaveProperty('score');
    expect(wrapper.text()).toContain(22);
  });
});
