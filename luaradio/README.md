From [http://luaradio.io](http://luaradio.io/)
> **LuaRadio** is a lightweight, embeddable flow graph signal processing framework for software-defined radio. It provides a suite of source, sink, and processing blocks, with a simple API for defining flow graphs, running flow graphs, creating blocks, and creating data types. LuaRadio is built on [LuaJIT][1], has a small binary footprint of under 750 KB (including LuaJIT), has no external hard dependencies, and is MIT licensed.
> 
> LuaRadio can be used to rapidly prototype software radios, modulation/demodulation utilities, and signal processing experiments. It can also be embedded into existing radio applications to serve as a user scriptable engine for processing samples.
> 
> LuaRadio blocks are written in pure Lua, but can use [LuaJIT's FFI][2] to wrap external libraries, like [VOLK][3], [liquid-dsp][4], and others, for computational acceleration, more sophisticated processing, and interfacing with SDR hardware.

> Use GNU Radio? See [how LuaRadio compares to GNU Radio][5].

## Example

_Mono Wideband FM Broadcast Radio Receiver_

![image](http://luaradio.io/docs/figures/flowgraph_rtlsdr_wbfm_mono_compact.png)

    local radio = require('radio')

    radio.CompositeBlock():connect(
        radio.RtlSdrSource(88.5e6 - 250e3, 1102500), -- RTL-SDR source, offset-tuned to 88.5 MHz - 250 kHz
        radio.TunerBlock(-250e3, 200e3, 5),          -- Translate -250 kHz, filter 200 kHz, decimate 5
        radio.FrequencyDiscriminatorBlock(1.25),     -- Frequency demodulate with 1.25 modulation index
        radio.LowpassFilterBlock(128, 15e3),         -- Low-pass filter 15 kHz for L+R audio
        radio.FMDeemphasisFilterBlock(75e-6),        -- FM de-emphasis filter with 75 uS time constant
        radio.DownsamplerBlock(5),                   -- Downsample by 5
        radio.PulseAudioSink(1)                      -- Play to system audio with PulseAudio
    ):run()

Check out some more [examples][7] of what you can build with LuaRadio.

To install simply execute the following in a terminal:
```
$ bash <(curl -s \
 https://raw.githubusercontent.com/marcelmaatkamp/docker-compose-applications/master/luaradio/bin/setup)
```

[1]: http://luajit.org/
[2]: http://luajit.org/ext_ffi.html
[3]: http://libvolk.org/
[4]: https://github.com/jgaeddert/liquid-dsp
[5]: docs/comparison-gnuradio.html
[6]: http://luaradio.io/docs/figures/flowgraph_rtlsdr_wbfm_mono_compact.png
[7]: examples/
[8]: http://www.fftw.org/
[9]: http://www.rtl-sdr.com/about-rtl-sdr/
[10]: docs/getting-started.html




