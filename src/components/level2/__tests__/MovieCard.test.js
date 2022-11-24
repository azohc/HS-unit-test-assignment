import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MovieCard from '../MovieCard.vue';

describe('MovieCard.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: {},
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  // test prop movie's values are rendered correctly
  // test computed from prop favoriteMovie is rendering the 😍 emoji when the prop movie's id is matching
  it('renders title for favorite (and non favorite) movies', () => {
    const favoriteCard = mount(MovieCard, {
      props: {
        movie: {
          id: 'gits',
          title: 'ghost in the shell',
          score: 99,
        },
        favoriteMovie: 'gits',
      },
    });
    const regularCard = mount(MovieCard, {
      props: {
        movie: {
          id: 'm',
          title: 'movie',
          score: 22,
        },
        favoriteMovie: 'gits',
      },
    });

    expect(favoriteCard.exists()).toBe(true);
    expect(favoriteCard.props()).toHaveProperty('movie');
    expect(favoriteCard.find('img').element.complete).toBeTruthy();
    expect(favoriteCard.text()).toContain('ghost in the shell');
    expect(favoriteCard.text()).toContain('😍');
    expect(favoriteCard.text()).toContain('99');

    expect(regularCard.exists()).toBe(true);
    expect(regularCard.props()).toHaveProperty('movie');
    expect(regularCard.find('img').element.complete).toBeTruthy();
    expect(regularCard.text()).toContain('movie');
    expect(regularCard.text()).not.toContain('😍');
    expect(regularCard.text()).toContain('22');
  });

  // Test event favorite-selected is being emitted on button click
  it("'s button emits a 'favorite-selected' event", async () => {
    const favoriteCard = mount(MovieCard, {
      props: {
        movie: {
          id: 'gits',
          title: 'ghost in the shell',
        },
        favoriteMovie: 'gits',
      },
    });
    const regularCard = mount(MovieCard, {
      props: {
        movie: {
          id: 'm',
          title: 'movie',
        },
        favoriteMovie: 'gits',
      },
    });
    await regularCard.find('button').trigger('click');
    expect(regularCard.emitted('favorite-selected')).toBeTruthy();
    expect(
      Object.hasOwn(favoriteCard.find('button').attributes(), 'disabled')
    ).toBeTruthy();
  });
});
