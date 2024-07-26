import { renderHook, act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAudio } from '../../hooks/useAudio';
import AudioPlayer from '../../components/audioPlayer';
import React from 'react';

describe('useAudio hook', () => {
    it('should initialize with empty audioUrl', () => {
        const { result } = renderHook(() => useAudio());
        expect(result.current.audioUrl).toBe('');
    });

    it('should update audioUrl when setAudioUrl is called', () => {
        const { result } = renderHook(() => useAudio());

        act(() => {
            result.current.setAudioUrl('https://example.com/audio.mp3');
        });
        
        expect(result.current.audioUrl).toBe('https://example.com/audio.mp3');
    });
});

describe('audio play using useAudio hook', () => {
    let mockElement: jest.Mocked<HTMLAudioElement>;
    let loadSpy: jest.SpyInstance;
    let playSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        mockElement = {
            load: jest.fn(),
            play: jest.fn().mockResolvedValue(undefined),
            onloadeddata: new Event('loadeddata')
            // ... 기타 속성 및 메서드
        } as unknown as jest.Mocked<HTMLAudioElement>;

        jest.spyOn(React, 'useRef').mockReturnValue({ current: mockElement });

        loadSpy = jest.spyOn(mockElement, 'load');
        playSpy = jest.spyOn(mockElement, 'play');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('redner audio element when audioUrl is provided', async () => {
        const { result } = renderHook(() => useAudio());

        act(() => {
            result.current.setAudioUrl('https://example.com/audio.mp3');
        });

        const { container } = render(<AudioPlayer audioUrl={result.current.audioUrl} audioRef={result.current.audioRef} />);

        // audio element should be rendered
        const audioElement = container.querySelector('audio');
        expect(audioElement).toBeInTheDocument();
        expect(audioElement).toHaveAttribute('controls');
        expect(audioElement).toHaveAttribute('autoplay');

        Object.defineProperty(result.current.audioRef, 'current', {
            writable: true,
            value: mockElement
        });

        Object.defineProperty(result.current.audioRef.current, 'onloadeddata', {
            writable: true,
            value: () => {
                mockElement.play();
            }
        });

        act(() => {
            if (result.current.audioRef.current && result.current.audioRef.current.onloadeddata) {
                (result.current.audioRef.current.onloadeddata as Function)();
            }
        });

        expect(result.current.audioRef.current).toBe(mockElement);
        
        expect(loadSpy).toHaveBeenCalled();
        expect(playSpy).toHaveBeenCalled();

    })
})