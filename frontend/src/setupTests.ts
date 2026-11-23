import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Backend no disponible'))));
