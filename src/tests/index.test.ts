import { ImprovMX } from '../index';

describe('ImprovMX', () => {
    const improvMx = new ImprovMX({ api_key: 'mock_api_key' });
    test('API Key', () => {
        expect(improvMx.config.api_key).toBe('mock_api_key');
    });
})
