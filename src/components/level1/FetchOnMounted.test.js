import { expect, it, describe, vi, afterEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import FetchOnMounted from './FetchOnMounted.vue';

// TODO: TDD Exercise: complete the implementation of the component FetchOnMounted
// so all tests pass
describe('FetchOnMounted.vue', () => {
  const fetchSpy = vi.fn();
  vi.stubGlobal('fetch', fetchSpy);

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = mount(FetchOnMounted);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls yesno API on mounted', () => {
    fetchSpy.mockReturnValue = {};
    mount(FetchOnMounted);
    expect(fetchSpy).toBeCalledTimes(1);
    expect(fetchSpy).toBeCalledWith('https://yesno.wtf/api');
  });

  it('shows image once fetch is completed', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({ image: 'test' });
        },
      })
    );
    const wrapper = mount(FetchOnMounted);

    // Wait until the DOM updates.
    await flushPromises();
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('test');
    expect(wrapper.text()).not.toContain('loading');
  });

  it('shows loading message', async () => {
    fetchSpy.mockImplementation(() => {});
    const wrapper = mount(FetchOnMounted);

    // TIP: not waiting for async op!
    // await flushPromises();
    expect(wrapper.text()).toContain('loading');
  });

  it('shows error on fetch not ok', async () => {
    fetchSpy.mockResolvedValue({ ok: false });
    const wrapper = mount(FetchOnMounted);

    // Wait until the DOM updates.
    await flushPromises();
    expect(wrapper.text()).toContain('error');
  });

  it('shows error on fetch error', async () => {
    fetchSpy.mockRejectedValue(new Error('reasons'));
    const wrapper = mount(FetchOnMounted);

    // Wait until the DOM updates.
    await flushPromises();
    expect(wrapper.text()).toContain('error');
  });
});
