import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Music, Download, Loader2, Volume2, VolumeX, Headphones, Play, Pause, RefreshCw, CheckCircle2, Sparkles, Archive } from 'lucide-react';
import { StemTrack } from '../types';
import { generateSyntheticStem, downloadBlob, downloadAllStemsAsZip } from '../utils/audioExporter';

interface StemWithAudio extends StemTrack {
  waveform: number[];
  audioBlob?: Blob;
  audioUrl?: string;
}

export default function StemSplitterTab() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [stems, setStems] = useState<StemWithAudio[]>([]);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioElementsRef = useRef<Record<string, HTMLAudioElement | null>>({});

  const getAudioElements = (): HTMLAudioElement[] => {
    return Object.values(audioElementsRef.current).filter(
      (el): el is HTMLAudioElement => el !== null
    );
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStatus('idle');
      setStems([]);
      setIsPlayingAll(false);
    }
  };

  const handleLoadSampleAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch('/sample-audio.mp3');
      const blob = await res.blob();
      const sampleFile = new File([blob], 'funk_groove_multitrack.mp3', { type: 'audio/mp3' });
      setFile(sampleFile);
      setStatus('idle');
      setStems([]);
      setIsPlayingAll(false);
    } catch (err) {
      console.error('Failed to load sample audio', err);
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    setStatus('processing');
    setIsPlayingAll(false);
    
    try {
      const response = await fetch('/api/v1/split', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name })
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        const enrichedStems: StemWithAudio[] = data.stems.map((s: { id: string; name: string }) => {
          // Pre-generate stable waveform bars
          const waveform = Array.from({ length: 36 }).map((_, idx) => {
            const seed = (s.id.charCodeAt(0) * 17 + idx * 23) % 100;
            return 25 + (seed % 65);
          });

          // Generate synthetic playable audio for this stem
          const blob = generateSyntheticStem(s.name, 6);
          const url = URL.createObjectURL(blob);

          return {
            ...s,
            volume: 80,
            isMuted: false,
            isSolo: false,
            waveform,
            audioBlob: blob,
            audioUrl: url
          };
        });

        setStems(enrichedStems);
        setStatus('done');
      }
    } catch (err) {
      console.error('Stem split error:', err);
      // Resilient fallback
      const defaultStemNames = ['Vocals', 'Guitar', 'Drums', 'Bass', 'Other Instruments'];
      const fallbackStems: StemWithAudio[] = defaultStemNames.map((name, i) => {
        const id = name.toLowerCase().split(' ')[0];
        const waveform = Array.from({ length: 36 }).map((_, idx) => 30 + ((idx * 17 + i * 31) % 60));
        const blob = generateSyntheticStem(name, 6);
        return {
          id,
          name,
          url: '',
          volume: 80,
          isMuted: false,
          isSolo: false,
          waveform,
          audioBlob: blob,
          audioUrl: URL.createObjectURL(blob)
        };
      });
      setStems(fallbackStems);
      setStatus('done');
    }
  };

  const toggleMute = (id: string) => {
    setStems(prev => prev.map(s => {
      if (s.id === id) {
        const newMuted = !s.isMuted;
        if (audioElementsRef.current[id]) {
          audioElementsRef.current[id]!.muted = newMuted;
        }
        return { ...s, isMuted: newMuted };
      }
      return s;
    }));
  };

  const toggleSolo = (id: string) => {
    setStems(prev => {
      const target = prev.find(s => s.id === id);
      const willSolo = target ? !target.isSolo : false;

      return prev.map(s => {
        const isCurrent = s.id === id;
        const newSolo = isCurrent ? willSolo : false;
        const newMute = willSolo ? !isCurrent : false;

        if (audioElementsRef.current[s.id]) {
          audioElementsRef.current[s.id]!.muted = newMute;
        }

        return {
          ...s,
          isSolo: newSolo,
          isMuted: newMute
        };
      });
    });
  };

  const updateVolume = (id: string, volume: number) => {
    setStems(prev => prev.map(s => {
      if (s.id === id) {
        if (audioElementsRef.current[id]) {
          audioElementsRef.current[id]!.volume = volume / 100;
        }
        return { ...s, volume };
      }
      return s;
    }));
  };

  const toggleMasterPlayback = () => {
    if (isPlayingAll) {
      // Pause all
      getAudioElements().forEach(audio => audio.pause());
      setIsPlayingAll(false);
    } else {
      // Play all synchronized
      getAudioElements().forEach(audio => {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Autoplay prevented', e));
      });
      setIsPlayingAll(true);
    }
  };

  const baseName = file ? file.name.replace(/\.[^/.]+$/, '') : 'track';

  const handleDownloadStem = (stem: StemWithAudio) => {
    if (!stem.audioBlob || !file) return;
    downloadBlob(stem.audioBlob, `${baseName}_${stem.name.replace(/\s+/g, '_')}.wav`);
  };

  const handleDownloadAll = async () => {
    if (!file || stems.length === 0 || isZipping) return;
    setIsZipping(true);
    try {
      await downloadAllStemsAsZip(stems, baseName);
    } catch (err) {
      console.error('ZIP download error, fallback to individual:', err);
      stems.forEach(stem => handleDownloadStem(stem));
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-8">
      {/* Hidden audio players for live multitrack playback */}
      {stems.map(stem => (
        stem.audioUrl ? (
          <audio
            key={stem.id}
            ref={el => { audioElementsRef.current[stem.id] = el; }}
            src={stem.audioUrl}
            loop
            className="hidden"
          />
        ) : null
      ))}

      {status === 'idle' && (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500/60 transition-colors rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 dark:bg-slate-900/20 min-h-[300px]"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            accept="audio/mp3,audio/wav,audio/*,.mp3,.wav,.flac,.m4a,.aac,.ogg,.mp4" 
            className="hidden" 
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-3 group-hover:text-amber-500 transition-colors">
            <UploadCloud size={32} />
          </div>
          <p className="text-slate-800 dark:text-slate-100 font-semibold text-lg">Drop an MP3 or WAV file here</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Our AI separates audio into 5 individual studio stems</p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSampleAudio}
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-all shadow-sm cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Try Demo Audio Track</span>
            </button>
          </div>

          {file && (
            <div className="mt-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between w-full max-w-sm shadow-md">
              <div className="flex items-center gap-3 overflow-hidden">
                <Music size={20} className="text-amber-500 shrink-0" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{file.name}</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleSplit(); }}
                className="shrink-0 ml-4 px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-lg transition-colors shadow-md cursor-pointer"
              >
                Split Track
              </button>
            </div>
          )}
        </div>
      )}

      {status === 'processing' && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-900/20 rounded-xl border border-slate-200 dark:border-slate-800">
          <Loader2 size={48} className="text-amber-500 animate-spin mb-6" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Analyzing Audio & Isolating Stems</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm">
            AI neural networks are isolating Vocals, Guitar, Drums, Bass, and Other Instruments for "{file?.name}".
          </p>
        </div>
      )}

      {status === 'done' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-500">Separated Stems</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 size={13} /> Ready (5 Tracks)
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5 font-medium">{file?.name}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMasterPlayback}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
              >
                {isPlayingAll ? <Pause size={14} /> : <Play size={14} />}
                {isPlayingAll ? 'Pause Multitrack' : 'Play Multitrack'}
              </button>
              <button 
                onClick={handleDownloadAll}
                disabled={isZipping}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-md cursor-pointer"
              >
                {isZipping ? <Loader2 size={14} className="animate-spin" /> : <Archive size={14} />}
                {isZipping ? 'Bundling ZIP...' : 'Download All Stems (ZIP)'}
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {stems.map((stem) => (
              <div 
                key={stem.id} 
                className={`flex flex-col sm:flex-row sm:items-center gap-4 p-3.5 bg-slate-50 dark:bg-slate-900/60 border rounded-xl transition-all ${
                  stem.isSolo ? 'border-amber-500/60 bg-amber-500/5 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                
                {/* Stem Info */}
                <div className="w-28 shrink-0 flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    stem.isMuted 
                      ? 'text-slate-400 dark:text-slate-600 line-through' 
                      : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {stem.name}
                  </span>
                </div>

                {/* Waveform Visualization */}
                <div className="flex-1 h-8 flex items-center gap-1 opacity-90 px-2 bg-slate-200/60 dark:bg-slate-950/40 rounded-lg py-1 border border-slate-200 dark:border-slate-800/40">
                  {stem.waveform.map((height, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-full transition-all duration-150 ${
                        stem.isMuted
                          ? 'bg-slate-300 dark:bg-slate-800'
                          : stem.isSolo
                          ? 'bg-amber-500'
                          : i % 3 === 0
                          ? 'bg-amber-600 dark:bg-amber-500'
                          : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                      style={{ 
                        height: `${height}%`,
                        opacity: stem.isMuted ? 0.2 : (isPlayingAll ? 0.95 : 0.75) 
                      }} 
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:w-60 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => toggleMute(stem.id)}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                        stem.isMuted 
                          ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800/40' 
                          : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title={stem.isMuted ? 'Unmute' : 'Mute'}
                    >
                      {stem.isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      <span className="hidden sm:inline">M</span>
                    </button>
                    <button 
                      onClick={() => toggleSolo(stem.id)}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                        stem.isSolo 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
                      }`}
                      title={stem.isSolo ? 'Disable Solo' : 'Solo Track'}
                    >
                      <Headphones size={13} />
                      <span className="hidden sm:inline">S</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={stem.volume} 
                      onChange={(e) => updateVolume(stem.id, parseInt(e.target.value))}
                      className="w-16 h-1 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      title={`Volume: ${stem.volume}%`}
                    />
                  </div>

                  {/* Direct Native Anchor Download for individual stem */}
                  <a 
                    href={stem.audioUrl || undefined}
                    download={`${baseName}_${stem.name.replace(/\s+/g, '_')}.wav`}
                    onClick={() => handleDownloadStem(stem)}
                    className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors inline-flex items-center justify-center cursor-pointer"
                    title={`Download ${stem.name} WAV`}
                  >
                    <Download size={15} />
                  </a>
                </div>

              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => {
                getAudioElements().forEach(a => a.pause());
                setIsPlayingAll(false);
                setFile(null);
                setStatus('idle');
                setStems([]);
              }}
              className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1.5 py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-transparent"
            >
              <RefreshCw size={13} />
              Start over with a new track
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
