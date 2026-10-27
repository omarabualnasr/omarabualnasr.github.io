/**
 * NOIR SIGNAL — PROCEDURAL SOUNDSCAPE SYNTHESIZER
 * 
 * Generates a cinematic, deep atmospheric drone using the Web Audio API.
 * 100% procedural with zero external audio assets.
 * Features:
 * - Sub-bass fundamental + tuned harmonic intervals (A1, E2, A2)
 * - Slow organic LFO breath modulation on cutoff frequency
 * - Subtle low-frequency tape/void room tone
 * - Smooth exponential fade-in on first user interaction
 * - Mute / unmute control with gentle gain transitions
 */

class SoundscapeManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;
  private isPlaying = false;
  private isMutedState = false;
  private targetVolume = 0.045; // Deliberately low, subtle cinematic volume

  public init(): void {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain for smooth fade-ins and mute control
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Warm analog-style lowpass filter to remove harsh highs
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      filter.connect(this.masterGain);

      // Slow organic breath LFO modulating filter cutoff
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.06, this.ctx.currentTime); // ~16 sec cycle
      lfoGain.gain.setValueAtTime(60, this.ctx.currentTime); // modulate +-60Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      // 1. Fundamental Sub Drone (A1: ~55 Hz)
      const osc1 = this.ctx.createOscillator();
      const osc1Gain = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime);
      osc1Gain.gain.setValueAtTime(0.65, this.ctx.currentTime);
      osc1.connect(osc1Gain);
      osc1Gain.connect(filter);
      osc1.start();

      // 2. Harmonic Fifth (E2: ~82.4 Hz with slight warm detune)
      const osc2 = this.ctx.createOscillator();
      const osc2Gain = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);
      osc2.detune.setValueAtTime(4, this.ctx.currentTime);
      osc2Gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      osc2.start();

      // 3. Resonant Octave (A2: ~110 Hz with triangle warmth)
      const osc3 = this.ctx.createOscillator();
      const osc3Gain = this.ctx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc3.detune.setValueAtTime(-5, this.ctx.currentTime);
      osc3Gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      osc3.connect(osc3Gain);
      osc3Gain.connect(filter);
      osc3.start();

      // 4. Subtle Void Noise (Low-filtered white noise buffer for organic spatial haze)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(110, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      whiteNoise.start();

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  public async start(): Promise<void> {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (!this.isMutedState) {
      // 3.5-second gentle fade-in
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 3.5);
    }

    this.isPlaying = true;
  }

  public toggleMute(): boolean {
    if (!this.ctx || !this.masterGain) return false;

    this.isMutedState = !this.isMutedState;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);

    if (this.isMutedState) {
      this.masterGain.gain.linearRampToValueAtTime(0, now + 0.5);
    } else {
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 0.8);
    }

    return !this.isMutedState;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMutedState;
  }

  public cleanup(): void {
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close().catch(() => {});
    }
    this.isInitialized = false;
    this.isPlaying = false;
  }
}

export const soundscape = new SoundscapeManager();
