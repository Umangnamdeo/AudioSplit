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
        className="w-full border-2 border-dashed border-[#1E293B] hover:border-amber-500/50 transition-colors rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer bg-transparent min-h-[300px]"
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
            <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
              <FileAudio size={28} />
            </div>
            <p className="text-white font-semibold text-base">{file.name}</p>
            <p className="text-xs text-slate-400 mt-1">
              {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to extract & convert
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#1A2436] text-slate-300 group-hover:text-amber-500 transition-colors rounded-full flex items-center justify-center mb-4">
              <UploadCloud size={28} />
            </div>
            <p className="text-white font-semibold text-base">Drag & drop your MP4 or Video file here</p>
            <p className="text-xs text-slate-400 mt-1">Supports MP4, MOV, MKV, WebM, AVI, or Audio files</p>
            
            <div className="mt-6 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoadSample();
                }}
                className="px-4 py-2 rounded-full bg-transparent border border-amber-500/50 hover:bg-amber-500/10 text-amber-500 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Try Demo MP4 Video</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="text-slate-500 dark:text-slate-400">
              <Settings2 size={20} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Output Quality</label>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select MP3 audio bitrate</p>
            </div>
          </div>
          <select 
            value={bitrate}
            onChange={(e) => setBitrate(e.target.value)}
            disabled={status === 'converting'}
            className="bg-white dark:bg-[#1A2436] text-slate-900 dark:text-white border border-slate-200 dark:border-[#334155] rounded-lg px-4 py-2 outline-none cursor-pointer shadow-sm hover:border-amber-500/50 transition-colors focus:ring-2 focus:ring-amber-500/30"
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
            className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Film size={18} />
            Convert & Extract MP3 Audio
          </button>
        )}

        {status === 'converting' && (
          <div className="p-4 bg-slate-100 dark:bg-[#1A2436] rounded-xl border border-slate-200 dark:border-[#334155]">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Extracting Audio Track</span>
              <span className="text-amber-600 dark:text-amber-500 font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-[#0B1320] rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-200 linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {status === 'done' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-[#1A2436] rounded-xl border border-slate-200 dark:border-[#334155]">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlayback}
                  className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center border-none cursor-pointer shadow-md transition-colors"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-0.5">
                    <CheckCircle2 size={14} /> Extraction Complete
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">{downloadFileName}</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 bg-white dark:bg-[#0B1320] text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-[#334155] font-medium">
                {bitrate} kbps
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.pause();
                  setFile(null);
                  setStatus('idle');
                  setConvertedAudioUrl(null);
                  setConvertedAudioBlob(null);
                  setIsPlaying(false);
                }}
                className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-[#1E293B] dark:hover:bg-[#334155] text-slate-800 dark:text-slate-200 font-bold text-sm uppercase rounded-xl transition-colors cursor-pointer border border-transparent dark:border-[#334155]"
              >
                Start Over
              </button>
              <a
                href={convertedAudioUrl || undefined}
                download={downloadFileName}
                onClick={handleDownload}
                className="flex-[2] flex items-center justify-center gap-2 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm uppercase rounded-xl transition-colors cursor-pointer shadow-lg shadow-amber-500/20 text-decoration-none"
              >
                <Download size={18} />
                Download MP3 Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
