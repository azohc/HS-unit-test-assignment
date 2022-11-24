import { expect, it, describe, vi, afterEach, beforeEach } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import MovieList from '../MovieList.vue';
import MovieCard from '../MovieCard.vue';
import dataService from '../utils/dataService';

describe('MovieList.vue', () => {
  const movies = [
    {
      id: 'gits',
      title: 'ghost in the shell',
      score: 99,
    },
    {
      id: 'eeaao2022',
      title: 'movie',
      score: 22,
    },
  ];

  beforeEach(() => {
    vi.spyOn(dataService, 'getMovies').mockReturnValue(movies);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(MovieList);
    expect(wrapper.exists()).toBe(true);
  });

  // Why is this a bad test? Reason your answer
  /**
   * This is a bad test because we are testing for a 'magic
   * number' of MovieCards (4). This is not great because the
   * actual number of MovieCards in the MovieList is equal
   * to the number of items in the movies array from the
   * dataService. If the dService returns a diff # of movies,
   * we'd need to update the magic number on this test
   * every time. We are testing the dataService, not the
   * MovieList's processing of the movies input into a number
   * of MovieCards
   */
  it('should render movie list', async () => {
    /** shallowMounted MovieList makes it ok to use
     * movies as string[] (bcuz MovieCards are stubbed)
     */
    const wrapper = shallowMount(MovieList);
    const movieCards = wrapper.findAllComponents(MovieCard);
    expect(movieCards.length).toBe(movies.length);
  });

  it('should have no favorite movie by default', async () => {
    const wrapper = shallowMount(MovieList);
    expect(wrapper.find('select').element.value).toBeFalsy();
  });

  it('should update favorite movie on favorite-selected event received', async () => {
    const wrapper = mount(MovieList);
    const movieCards = wrapper.findAllComponents(MovieCard);
    movieCards.forEach((mc, i) =>
      mc.vm.$emit('favorite-selected', movies[i].id)
    );
    await wrapper.vm.$nextTick();
    const select = wrapper.find('option:checked');
    expect(select.exists()).toBeTruthy();
  });
});
