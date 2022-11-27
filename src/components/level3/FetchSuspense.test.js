import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import FetchSuspense from './FetchSuspense.vue';
import FetchSuspenseParent from './FetchSuspenseParent.vue';
// TODO: complete the test suite for this component!

describe('FetchSuspense.vue', () => {
  const fetchSpy = vi.fn();
  vi.stubGlobal('fetch', fetchSpy);

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = mount(FetchSuspense);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('calls fetch API', () => {
    mount(FetchSuspense);
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('throws error on fetch not ok', async () => {
    fetchSpy.mockResolvedValue({ ok: false });
    vi.stubGlobal('fetch', fetchSpy);
    const parent = mount(FetchSuspenseParent);
    await flushPromises();
    expect(parent.text()).toContain('ERROR');
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('throws error on fetch error', async () => {
    fetchSpy.mockRejectedValueOnce('fetch failed');
    const parent = mount(FetchSuspenseParent);
    await flushPromises();
    expect(parent.text()).toContain('ERROR');
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('shows image once fetch is completed', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: true, image: 'test' });
    vi.stubGlobal('fetch', fetchSpy);
    const wrapper = mount(FetchSuspenseParent);

    await flushPromises();
    const img = wrapper.find('img');
    // const img = wrapper.findComponent(FetchSuspense).find('img');
    expect(img.attributes('src')).toBe('test');
    expect(fetchSpy).toHaveBeenCalledOnce();
  });
});
