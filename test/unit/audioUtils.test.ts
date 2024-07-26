import { AudioUtils } from '@/utils/audioUtils'
import { describe } from 'node:test'

// Mock fetch globally
jest.mock('node-fetch');

describe('AudioUtils', () => {
    it('should return an audio url', async () => {
        let mockArrayBuffer: ArrayBuffer = new ArrayBuffer(8);

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            arrayBuffer: jest.fn().mockResolvedValue(mockArrayBuffer),
        });
        
        const mockUrl = 'blob:http://localhost/mock-blob-url';
        global.URL.createObjectURL = jest.fn().mockReturnValue(mockUrl)
    
        const text = 'hello';
        const audioUrl = await AudioUtils(text);
    
        expect(audioUrl).toBe(mockUrl);
    });

    it('should return an error message', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
        });

        const text = 'hello'
        const audioUrl = await AudioUtils(text)

        expect(audioUrl).toBe('Can you say that again? I didn\'t catch that.')
    })
})