import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FetchSuspense from './FetchSuspense.vue';
// TODO: complete the test suite for this component!

describe('FetchSuspense.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(FetchSuspense);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('calls fetch API', () => {});

  it('throws error on fetch not ok', () => {});

  it('throws error on fetch error', () => {});

  it('shows image once fetch is completed', () => {});
});
