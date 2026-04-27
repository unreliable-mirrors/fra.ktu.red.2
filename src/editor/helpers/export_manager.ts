import { DataStore, type SceneState } from "fra.ktu.red-component";
import JSZip from "jszip";

type ExportFormat = "zip" | "mp4";

type ExportedFrame = {
  filename: string;
  content: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PixiApp = any;

let activeExport: Promise<void> | null = null;

const FRAME_RATE = 30;

const getSceneExportContext = (
  sceneStateId: string,
): {
  state: SceneState;
  application: PixiApp;
} => {
  const state = DataStore.getInstance().getStore(sceneStateId) as SceneState;
  const application = DataStore.getInstance().getStore(
    "application",
  ) as PixiApp;

  if (!state) {
    throw new Error(`Scene state "${sceneStateId}" is not available.`);
  }

  if (!application) {
    throw new Error("Pixi application is not available for export.");
  }

  return { state, application };
};

const waitForAnimationFrame = (): Promise<void> => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
};

const waitForMs = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const createSceneFrame = (width: number, height: number) => {
  return {
    x: 0,
    y: 0,
    width,
    height,
    copyTo(target: { x: number; y: number; width: number; height: number }) {
      target.x = this.x;
      target.y = this.y;
      target.width = this.width;
      target.height = this.height;

      return target;
    },
  };
};

const updateExportFrame = async (
  sceneStateId: string,
  application: PixiApp,
  frameIndex: number,
): Promise<void> => {
  const elapsedTime = (frameIndex / FRAME_RATE) * 1000;
  DataStore.getInstance().setStore(
    `instances.${sceneStateId}.currentExportFrame`,
    frameIndex + 1,
  );
  DataStore.getInstance().setStore("elapsedTime", elapsedTime);
  application.render();
  await waitForAnimationFrame();
};

const captureFrame = async (
  sceneStateId: string,
  application: PixiApp,
  filename: string,
): Promise<ExportedFrame> => {
  const { state } = getSceneExportContext(sceneStateId);

  return {
    filename,
    content: await application.renderer.extract.base64({
      target: application.stage,
      frame: createSceneFrame(state.width, state.height),
    }),
  };
};

const downloadUrl = (filename: string, url: string) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const saveFramesZip = async (
  sceneStateId: string,
  frames: ExportedFrame[],
): Promise<void> => {
  const { state } = getSceneExportContext(sceneStateId);
  const zip = new JSZip();

  for (const frame of frames) {
    const base64Content = frame.content.includes(",")
      ? frame.content.split(",")[1]!
      : frame.content;
    zip.file(frame.filename, base64Content, { base64: true });
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  try {
    downloadUrl(`${state.name}_frames.zip`, url);
  } finally {
    URL.revokeObjectURL(url);
  }
};

const resolveVideoMimeType = (): { mimeType: string; extension: string } => {
  if (typeof MediaRecorder === "undefined") {
    throw new Error("MediaRecorder is not available in this browser.");
  }

  const candidates = [
    { mimeType: "video/mp4;codecs=h264", extension: "mp4" },
    { mimeType: "video/webm;codecs=vp9", extension: "webm" },
    { mimeType: "video/webm;codecs=vp8", extension: "webm" },
    { mimeType: "video/webm", extension: "webm" },
  ];

  for (const candidate of candidates) {
    if (MediaRecorder.isTypeSupported(candidate.mimeType)) {
      return candidate;
    }
  }

  throw new Error("No supported MediaRecorder video format is available.");
};

const saveVideo = async (
  sceneStateId: string,
  application: PixiApp,
): Promise<void> => {
  const { state } = getSceneExportContext(sceneStateId);
  const canvas = application.canvas as HTMLCanvasElement;

  if (!canvas.captureStream) {
    throw new Error("Canvas stream capture is not supported in this browser.");
  }

  const totalFrames = Math.max(1, Math.round(state.duration * FRAME_RATE));
  const stream = canvas.captureStream(FRAME_RATE);
  const { mimeType, extension } = resolveVideoMimeType();
  const chunks: Blob[] = [];

  const recorder = new MediaRecorder(stream, { mimeType });
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  const stopped = new Promise<void>((resolve, reject) => {
    recorder.onstop = () => resolve();
    recorder.onerror = (event) =>
      reject((event as ErrorEvent).error ?? new Error("MediaRecorder error"));
  });

  recorder.start();

  try {
    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
      await updateExportFrame(sceneStateId, application, frameIndex);
      await waitForMs(1000 / FRAME_RATE);
    }
  } finally {
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
  }

  await stopped;

  const videoBlob = new Blob(chunks, { type: mimeType });
  const url = URL.createObjectURL(videoBlob);
  try {
    downloadUrl(`${state.name}.${extension}`, url);
  } finally {
    URL.revokeObjectURL(url);
  }
};

const runExport = async (
  sceneStateId: string,
  format: ExportFormat,
): Promise<void> => {
  if (activeExport) {
    return activeExport;
  }

  activeExport = (async () => {
    const { state, application } = getSceneExportContext(sceneStateId);
    const previousPlaying =
      (DataStore.getInstance().getStore("playing") as boolean | null) ?? false;
    const previousElapsedTime =
      (DataStore.getInstance().getStore("elapsedTime") as number | null) ?? 0;
    const totalFrames = Math.max(1, Math.round(state.duration * FRAME_RATE));

    DataStore.getInstance().setStore("playing", false);
    DataStore.getInstance().setStore(
      `instances.${sceneStateId}.exporting`,
      true,
    );
    DataStore.getInstance().setStore(
      `instances.${sceneStateId}.exportNext`,
      false,
    );
    DataStore.getInstance().setStore(
      `instances.${sceneStateId}.exportFormat`,
      format,
    );
    DataStore.getInstance().setStore(
      `instances.${sceneStateId}.currentExportFrame`,
      0,
    );

    try {
      if (format === "mp4") {
        await saveVideo(sceneStateId, application);
      } else {
        const frames: ExportedFrame[] = [];
        for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
          await updateExportFrame(sceneStateId, application, frameIndex);
          frames.push(
            await captureFrame(
              sceneStateId,
              application,
              `frame_${(frameIndex + 1).toString().padStart(4, "0")}.png`,
            ),
          );
        }
        await saveFramesZip(sceneStateId, frames);
      }
    } finally {
      DataStore.getInstance().setStore(
        `instances.${sceneStateId}.exporting`,
        false,
      );
      DataStore.getInstance().setStore(
        `instances.${sceneStateId}.exportNext`,
        false,
      );
      DataStore.getInstance().setStore(
        `instances.${sceneStateId}.currentExportFrame`,
        0,
      );
      DataStore.getInstance().setStore("elapsedTime", previousElapsedTime);
      DataStore.getInstance().setStore("playing", previousPlaying);
      application.render();
      activeExport = null;
    }
  })();

  return activeExport;
};

export const exportFrame = async (sceneStateId: string): Promise<void> => {
  const { state, application } = getSceneExportContext(sceneStateId);
  const previousExportNext = DataStore.getInstance().getStore(
    `instances.${sceneStateId}.exportNext`,
  ) as boolean | undefined;

  DataStore.getInstance().setStore(
    `instances.${sceneStateId}.exportNext`,
    false,
  );

  try {
    const frame = await captureFrame(
      sceneStateId,
      application,
      `${state.name}.png`,
    );
    downloadUrl(frame.filename, frame.content);
  } finally {
    DataStore.getInstance().setStore(
      `instances.${sceneStateId}.exportNext`,
      previousExportNext ?? false,
    );
  }
};

export const exportSequence = async (
  sceneStateId: string,
  format: ExportFormat,
): Promise<void> => {
  await runExport(sceneStateId, format);
};
