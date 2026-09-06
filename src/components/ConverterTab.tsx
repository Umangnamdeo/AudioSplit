import React, { useState, useRef } from 'react';
import { UploadCloud, FileAudio, Settings2, Download, CheckCircle2, Play, Pause, RefreshCw, Film, Sparkles } from 'lucide-react';
import { extractAudioFromFile, downloadBlob } from '../utils/audioExporter';

export default function ConverterTab() {
  const [file, setFile] = useState<File | null>(null);
  const [bitrate, setBitrate] = useState('320');
  const [status, setStatus] = useState<'idle' | 'converting' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [convertedAudioUrl, setConvertedAudioUrl] = useState<string | null>(null);
  const [convertedAudioBlob, setConvertedAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStatus('idle');
      setProgress(0);
      setConvertedAudioUrl(null);
      setConvertedAudioBlob(null);
      setIsPlaying(false);
    }
  };

  const handleLoadSample = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch('/sample-video.mp4');
      const blob = await res.blob();
      const sampleFile = new File([blob], 'sample_podcast_clip.mp4', { type: 'video/mp4' });
      setFile(sampleFile);
      setStatus('idle');
      setProgress(0);
      setConvertedAudioUrl(null);
      setConvertedAudioBlob(null);
      setIsPlaying(false);
    } catch (err) {
      console.error('Failed to load sample video', err);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus('converting');
    setProgress(15);
    
    try {
      // Progress simulation for smooth responsive UX
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) return 85;
          return prev + 15;
        });
      }, 120);

      // Perform extraction using high-fidelity backend FFmpeg with client fallback
      const audioBlob = await extractAudioFromFile(file, bitrate);
      clearInterval(progressTimer);
      setProgress(100);

      setConvertedAudioBlob(audioBlob);
      const url = URL.createObjectURL(audioBlob);
      setConvertedAudioUrl(url);
      setStatus('done');
    } catch (err) {
      console.error('Conversion failed:', err);
      setStatus('idle');
      alert('Could not convert audio. Please check file format.');
    }
  };

  const handleDownload = (e?: React.MouseEvent) => {
    if (!convertedAudioBlob || !file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    downloadBlob(convertedAudioBlob, `${baseName}_${bitrate}kbps.mp3`);
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const baseFileName = file ? file.name.replace(/\.[^/.]+$/, '') : 'audio';
  const downloadFileName = `${baseFileName}_${bitrate}kbps.mp3`;

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {convertedAudioUrl && (
        <audio
          ref={audioRef}
          src={convertedAudioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      {/* Upload Zone */}
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500/60 transition-colors rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 dark:bg-slate-900/20 group relative"
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          accept="video/mp4,video/x-m4v,video/*,audio/*,.mp4,.mov,.avi,.mkv,.webm" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
              setStatus('idle');
              setProgress(0);
              setConvertedAudioUrl(null);
              setConvertedAudioBlob(null);
              setIsPlaying(false);
            }
          }}
        />
        
        {file ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-500/10 dark:bg-amber-600/20 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center mb-3">
              <FileAudio size={32} />
            </div>
            <p className="text-slate-900 dark:text-slate-50 font-semibold text-base">{file.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to extract & convert
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-amber-500 transition-colors rounded-full flex items-center justify-center mb-3">
              <UploadCloud size={32} />
            </div>
            <p className="text-slate-800 dark:text-slate-100 font-semibold text-base">Drag & drop your MP4 or Video file here</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports MP4, MOV, MKV, WebM, AVI, or Audio files</p>
            
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-all shadow-sm cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Try Demo MP4 Video</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
              <Settings2 size={20} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-50">Output Quality</label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select MP3 audio bitrate</p>
            </div>
          </div>
          <select 
            value={bitrate}
            onChange={(e) => setBitrate(e.target.value)}
            disabled={status === 'converting'}
            className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <option value="128">128 kbps (Standard)</option>
            <option value="192">192 kbps (High Quality)</option>
            <option value="320">320 kbps (Extreme Studio Quality)</option>
          </select>
        </div>

        {/* Action / Progress Area */}
        {status === 'idle' && (
          <button
            onClick={handleConvert}
            disabled={!file}
            className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-md text-sm"
          >
            <Film size={16} />
            Convert & Extract MP3 Audio
          </button>
        )}

        {status === 'converting' && (
          <div className="space-y-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Extracting Audio Track</span>
              <span className="font-mono text-amber-600 dark:text-amber-500 text-xs font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-600 transition-all duration-200 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">Converting: {file?.name}</p>
          </div>
        )}

        {status === 'done' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlayback}
                  className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                  title={isPlaying ? 'Pause preview' : 'Play preview'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 size={14} /> Extraction Complete
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{downloadFileName}</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-mono border border-slate-200 dark:border-slate-700 shrink-0">
                {bitrate} kbps
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                  }
                  setFile(null);
                  setStatus('idle');
                  setConvertedAudioUrl(null);
                  setConvertedAudioBlob(null);
                  setIsPlaying(false);
                }}
                className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm border border-slate-200 dark:border-transparent"
              >
                <RefreshCw size={16} />
                Convert Another
              </button>
              
              {/* Guaranteed Direct Native Anchor Download Button */}
              <a
                href={convertedAudioUrl || undefined}
                download={downloadFileName}
                onClick={handleDownload}
                className="flex-[2] py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer text-sm text-center"
              >
                <Download size={18} />
                Download Converted MP3
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
