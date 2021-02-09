<p align="center">
<img src="example.png" alt="preview" width="75%" height="75%">
</p>

# RoA-Leaderboard-Generator
A web-application that generates a leaderboard using the font and graphics from the video game [Rivals of Aether](https://rivalsofaether.com/). Try it out [here](https://benwang2.github.io/pr-generator/)!

# How does it work?
A template image is pasted onto the canvas, which serves as the backdrop.

The simplistic Rivals of Aether font is generated using matrix that including data that indicate whether a pixels are transparent, black, or white and then drawn onto the canvas.

The "main" and "secondary" images are cropped and drawn from their corresponding image files.