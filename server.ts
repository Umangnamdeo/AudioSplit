import express from "express";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import multer from "multer";
import { createServer as createViteServer } from "vite";

const upload = multer({
  dest: "/tmp/audiosplit_uploads/",
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure temp upload directory exists
  if (!fs.existsSync("/tmp/audiosplit_uploads/")) {
    fs.mkdirSync("/tmp/audiosplit_uploads/", { recursive: true });
  }

  // Trust Cloud Run / reverse proxy for https protocol
  app.set('trust proxy', true);

  // Increase payload limit for audio files
  app.use(express.json({ limit: '50mb' }));

  // API endpoint contract for stem splitting
  app.post("/api/v1/split", (req, res) => {
    // Mock response for processing stem separation using Demucs/Spleeter
    setTimeout(() => {
      res.json({
        status: "success",
        stems: [
          { id: "vocals", name: "Vocals", url: "/mock-vocals.mp3" },
          { id: "guitar", name: "Guitar", url: "/mock-guitar.mp3" },
          { id: "drums", name: "Drums", url: "/mock-drums.mp3" },
          { id: "bass", name: "Bass", url: "/mock-bass.mp3" },
          { id: "other", name: "Other Instruments", url: "/mock-other.mp3" }
        ]
      });
    }, 1500);
  });

  // MP4 to MP3 audio conversion endpoint using native ffmpeg
  app.post("/api/convert/mp4-to-mp3", upload.single("file"), (req, res) => {
    const bitrate = ["128", "192", "320"].includes(req.body.bitrate) ? req.body.bitrate : "192";
    let inputPath = req.file?.path;
    let isTempFile = true;

    if (!inputPath) {
      // If no file uploaded, check if sample video exists for testing
      const samplePath = path.join(process.cwd(), "public", "sample-video.mp4");
      if (fs.existsSync(samplePath)) {
        inputPath = samplePath;
        isTempFile = false;
      } else {
        return res.status(400).json({ error: "No video file provided for conversion." });
      }
    }

    const outputId = `output_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const outputPath = `/tmp/audiosplit_uploads/${outputId}.mp3`;

    const command = `ffmpeg -i "${inputPath}" -vn -b:a ${bitrate}k -map a "${outputPath}" -y`;

    exec(command, (error) => {
      if (isTempFile && inputPath && fs.existsSync(inputPath)) {
        try { fs.unlinkSync(inputPath); } catch (_) {}
      }

      if (error || !fs.existsSync(outputPath)) {
        console.error("FFmpeg conversion error:", error);
        return res.status(500).json({ error: "Failed to extract audio track from video." });
      }

      const originalName = req.file?.originalname || "extracted_audio.mp4";
      const baseName = originalName.replace(/\.[^/.]+$/, "");
      const downloadName = `${baseName}_${bitrate}kbps.mp3`;

      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);

      const fileStream = fs.createReadStream(outputPath);
      fileStream.pipe(res);

      fileStream.on("close", () => {
        try {
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch (_) {}
      });
    });
  });

  // Health check endpoint for deployment probes and tests
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "AudioSplit", uptime: process.uptime() });
  });

  // Google Site Verification endpoint
  app.get(["/google4ddf6a8fb9c58e46.html", "/AudioSplit/google4ddf6a8fb9c58e46.html"], (req, res) => {
    res.type("text/html").send("google-site-verification: google4ddf6a8fb9c58e46.html");
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
