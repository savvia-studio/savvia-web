import librosa, numpy as np
y, sr = librosa.load('smooth-lovin.mp3', sr=22050, mono=True)
tempo, beats = librosa.beat.beat_track(y=y, sr=sr, start_bpm=75, tightness=200)
bt = librosa.frames_to_time(beats, sr=sr)
d = np.diff(bt)
print('tempo', tempo, 'beats', len(bt), 'median ibi', np.median(d), '=> bpm', 60/np.median(d))
print('first beats', np.round(bt[:12], 3))
# energy per 4-beat bar to find sections
rms = librosa.feature.rms(y=y, hop_length=512)[0]; tr = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=512)
for i in range(0, len(bt)-4, 8):
    s, e = bt[i], bt[i+4] if i+4 < len(bt) else bt[-1]
    m = rms[(tr>=s)&(tr<e)].mean()
    print(f'{i:4d} {s:7.2f}s rms {m:.3f}')
