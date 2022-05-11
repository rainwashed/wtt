<p align="center">
    <img src="./view/assets/wtt_banner.png" alt="wtt_banner.png">
</p>
<h1 align="center"><b>wtt</b></h1>
<h3 align="center">A cli for Windows Terminal</h3>

This is the Windows Terminal Terminal binary.

To compile the binary, run ``node build.js`` and the build process should automatically happen (which includes checksums)

### Bugs
- Checksum is different every time (most likely due to **pkg** adding metadata during compilation changing the checksum)