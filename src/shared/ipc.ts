/**
 * Single source of truth for IPC: channel names + payload types.
 * Imported by main, preload and renderer so all three stay in sync.
 *
 * Naming convention: "<domain>:<action>"
 */

// ---- Pattern 1: renderer -> main, fire-and-forget (send / on) ----
export const IPC_WINDOW_SET_TITLE = 'window:set-title'

// ---- Pattern 2: renderer -> main, request/response (invoke / handle) ----
export const IPC_SYSTEM_GET_INFO = 'system:get-info'
export const IPC_NOTES_SAVE = 'notes:save'

// ---- Pattern 3: main -> renderer, push events (webContents.send / on) ----
export const IPC_CLOCK_START = 'clock:start' // invoke: renderer asks main to begin
export const IPC_CLOCK_STOP = 'clock:stop' // invoke: renderer asks main to stop
export const IPC_CLOCK_TICK = 'clock:tick' // push: main -> renderer

export interface SystemInfo {
  platform: string
  arch: string
  electron: string
  node: string
  totalMemMB: number
}

/** Errors are returned as data instead of thrown, so the message survives the IPC boundary intact. */
export type Result<T> = { ok: true; data: T } | { ok: false; error: string }

export interface ClockTick {
  iso: string
  count: number
}

/** The exact shape exposed on `window.api` by the preload script. */
export interface Api {
  // pattern 1
  setTitle(title: string): void
  // pattern 2
  getSystemInfo(): Promise<SystemInfo>
  saveNote(text: string): Promise<Result<{ path: string; bytes: number }>>
  // pattern 3
  startClock(intervalMs: number): Promise<void>
  stopClock(): Promise<void>
  /** Subscribe to ticks. Returns an unsubscribe function. */
  onClockTick(cb: (tick: ClockTick) => void): () => void
}
